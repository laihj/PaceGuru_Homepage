#!/bin/bash
# Compress images for paceguru.app SEO
# Uses macOS built-in sips command

PROJECT_ROOT="/Users/laihj/workspace/paceguru"
PUBLIC_DIR="$PROJECT_ROOT/public"

# Images to compress (from audit report)
declare -a IMAGES=(
    "blog/en/images/189/aero_entry.png"
    "blog/en/images/189/areo_lsd.png"
    "blog/en/images/main/detail.png"
    "blog/en/images/main/widge_watch.png"
    "blog/en/images/tools/tools.jpeg"
    "blog/zh/images/detail528.JPG"
    "blog/zh/images/trend.jpeg"
    "blog/zh/images/customize.jpeg"
    "blog/zh/images/watch.jpeg"
    "blog/zh/images/ShowPlanList.jpeg"
    "blog/zh/images/Show.jpeg"
    "blog/zh/images/AddWithDate.jpeg"
    "blog/zh/images/home.jpeg"
    "blog/zh/images/widget.jpeg"
    "blog/zh/images/detail_zones.png"
)

echo "🖼️  PaceGuru Image Compression Tool"
echo "===================================="
echo ""

compressed=0
skipped=0
errors=0

for img_rel in "${IMAGES[@]}"; do
    img_path="$PUBLIC_DIR/$img_rel"

    if [ ! -f "$img_path" ]; then
        echo "⚠️  File not found: $img_rel"
        ((errors++))
        continue
    fi

    # Get original size in KB
    original_size=$(du -k "$img_path" | cut -f1)
    original_mb=$(echo "scale=2; $original_size / 1024" | bc)

    echo "Processing: $img_rel (${original_mb} MB)"

    # Create backup
    cp "$img_path" "${img_path}.bak"

    # Get file extension
    ext="${img_path##*.}"
    filename="${img_path%.*}"

    # For PNG files larger than 200KB, convert to JPEG first for better compression
    if [[ "$ext" == "png" ]] && [ $original_size -gt 200 ]; then
        echo "  → Converting PNG to JPEG for better compression..."
        sips -s format jpeg "$img_path" --out "${filename}.jpg" >/dev/null 2>&1
        if [ -f "${filename}.jpg" ]; then
            mv "${filename}.jpg" "$img_path"
        fi
    fi

    # Compress using sips
    # For JPEG: reduce quality to 70%
    # For PNG: no quality option, sips handles it
    sips -s format jpeg -s formatOptions 70 "$img_path" --out "$img_path" >/dev/null 2>&1

    # Get new size
    new_size=$(du -k "$img_path" | cut -f1)
    new_mb=$(echo "scale=2; $new_size / 1024" | bc)

    # Calculate reduction
    if [ $original_size -gt 0 ]; then
        reduction=$(echo "scale=1; (1 - $new_size / $original_size) * 100" | bc)
        echo "  ✓ ${original_mb} MB → ${new_mb} MB (${reduction}% reduction)"
    fi

    ((compressed++))
    echo ""
done

echo "===================================="
echo "✓ Compressed: $compressed images"
echo "✗ Errors: $errors images"
echo ""
echo "💡 Backup files created with .bak extension"
echo "   To restore all backups:"
echo "   cd $PUBLIC_DIR"
echo "   find . -name '*.bak' -exec sh -c 'mv \"$1\" \"${1%.bak}\"' _ {} \\;"
