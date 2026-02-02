#!/usr/bin/env python3
"""
Compress images in paceguru project to reduce file size.
Targets images larger than 100KB.
"""

import os
import sys
from pathlib import Path
from PIL import Image

# Project root
PROJECT_ROOT = Path("/Users/laihj/workspace/paceguru")
PUBLIC_DIR = PROJECT_ROOT / "public"

# Images to compress (from audit report)
IMAGES_TO_COMPRESS = [
    "blog/en/images/189/aero_entry.png",        # 184.1 KB
    "blog/en/images/189/areo_lsd.png",          # 845.8 KB
    "blog/en/images/main/detail.png",            # 121.6 KB
    "blog/en/images/main/widge_watch.png",       # 136.6 KB
    "blog/en/images/tools/tools.jpeg",           # 132.5 KB
    "blog/zh/images/detail528.JPG",              # 299.2 KB
    "blog/zh/images/trend.jpeg",                 # 296.5 KB
    "blog/zh/images/customize.jpeg",             # 1.4 MB
    "blog/zh/images/watch.jpeg",                 # 808.2 KB
    "blog/zh/images/ShowPlanList.jpeg",          # 107.1 KB
    "blog/zh/images/Show.jpeg",                  # 120.0 KB
    "blog/zh/images/AddWithDate.jpeg",           # 144.1 KB
    "blog/zh/images/home.jpeg",                  # 109.4 KB
    "blog/zh/images/widget.jpeg",                # 159.6 KB
    "blog/zh/images/detail_zones.png",           # 426.5 KB
]


def compress_image(input_path: Path, quality: int = 85) -> bool:
    """
    Compress an image file.

    Args:
        input_path: Path to the image file
        quality: JPEG quality (1-100) or PNG compression level

    Returns:
        True if successful, False otherwise
    """
    if not input_path.exists():
        print(f"  ⚠️  File not found: {input_path}")
        return False

    try:
        # Get original size
        original_size = input_path.stat().st_size / 1024  # KB

        with Image.open(input_path) as img:
            # Convert RGBA to RGB for JPEG
            if img.mode in ('RGBA', 'LA', 'P'):
                # Create white background
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
                img = background

            # Determine output format
            ext = input_path.suffix.lower()
            if ext in ['.png', '.jpg', '.jpeg']:
                # For large PNGs, convert to JPEG for better compression
                if ext == '.png' and original_size > 200:
                    output_ext = '.jpg'
                else:
                    output_ext = ext
            else:
                output_ext = '.jpg'

            # Create backup
            backup_path = input_path.with_suffix(input_path.suffix + '.bak')
            if not backup_path.exists():
                import shutil
                shutil.copy2(input_path, backup_path)

            # Save compressed version
            if output_ext == '.png':
                img.save(input_path, 'PNG', optimize=True, compress_level=9)
            else:  # JPEG
                img.save(input_path, 'JPEG', quality=quality, optimize=True)

        # Get new size
        new_size = input_path.stat().st_size / 1024  # KB
        reduction = (1 - new_size / original_size) * 100

        print(f"  ✓ {input_path.name}: {original_size:.1f} KB → {new_size:.1f} KB ({reduction:.1f}% reduction)")
        return True

    except Exception as e:
        print(f"  ✗ Error compressing {input_path}: {e}")
        return False


def main():
    """Main function to compress all target images."""
    print("🖼️  PaceGuru Image Compression Tool")
    print("=" * 50)
    print()

    compressed_count = 0
    skipped_count = 0
    error_count = 0

    for rel_path in IMAGES_TO_COMPRESS:
        input_path = PUBLIC_DIR / rel_path
        print(f"Processing: {rel_path}")

        if compress_image(input_path):
            compressed_count += 1
        else:
            error_count += 1

        print()

    # Summary
    print("=" * 50)
    print(f"✓ Compressed: {compressed_count} images")
    print(f"✗ Errors: {error_count} images")

    if compressed_count > 0:
        print()
        print("💡 Backup files created with .bak extension")
        print("   To restore: mv image.jpeg.bak image.jpeg")

    return 0 if error_count == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
