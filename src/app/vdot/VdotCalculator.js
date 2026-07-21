'use client';

import { useMemo, useState } from 'react';
import {
  RACE_EVENTS,
  formatDuration,
  formatPace,
  getFinishTimeForVdot,
  getPaceForVdot,
  getVdotForRace,
} from '../../lib/vdot';
import { DEFAULT_VDOT_LOCALE, VDOT_LOCALES, getVdotCopy, vdotPath } from '../../lib/vdot-i18n';
import styles from './vdot.module.css';

const DEFAULT_TIME = { hours: '0', minutes: '25', seconds: '0' };

function numberFromInput(value) {
  if (value === '') return 0;
  return Number(value);
}

export default function VdotCalculator({ locale = DEFAULT_VDOT_LOCALE }) {
  const copy = getVdotCopy(locale);
  const [selectedKey, setSelectedKey] = useState('50');
  const [time, setTime] = useState(DEFAULT_TIME);

  const seconds = numberFromInput(time.hours) * 3600
    + numberFromInput(time.minutes) * 60
    + numberFromInput(time.seconds);
  const hasValidClock = [time.hours, time.minutes, time.seconds].every((value) => value !== '')
    && [numberFromInput(time.hours), numberFromInput(time.minutes), numberFromInput(time.seconds)]
      .every((value) => Number.isInteger(value) && value >= 0)
    && numberFromInput(time.minutes) < 60
    && numberFromInput(time.seconds) < 60
    && seconds > 0;

  const vdot = useMemo(
    () => (hasValidClock ? getVdotForRace(selectedKey, seconds) : null),
    [hasValidClock, seconds, selectedKey],
  );

  const predictions = useMemo(
    () => (vdot === null ? [] : RACE_EVENTS.map((event) => ({
      ...event,
      finishTime: getFinishTimeForVdot(vdot, event.key),
      pace: getPaceForVdot(vdot, event.key),
    }))),
    [vdot],
  );

  const raceEvents = RACE_EVENTS.map((event) => ({ ...event, label: copy.distances[event.key] }));
  const selectedEvent = raceEvents.find((event) => event.key === selectedKey);

  function updateTime(part, value) {
    if (!/^\d{0,2}$/.test(value)) return;
    setTime((current) => ({ ...current, [part]: value }));
  }

  function resetCalculator() {
    setSelectedKey('50');
    setTime(DEFAULT_TIME);
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <a className={styles.brand} href={copy.brandHomeUrl} aria-label={copy.brandHomeLabel}>
            <span className={styles.brandMark}>P</span>
            <span>PaceGuru</span>
          </a>
          <div className={styles.headerTools}>
            <nav className={styles.languageNav} aria-label="Language">
              {VDOT_LOCALES.map((language) => (
                <a className={language === locale ? styles.localeLinkActive : styles.localeLink} href={vdotPath(language)} key={language} lang={language}>
                  {getVdotCopy(language).localeName}
                </a>
              ))}
            </nav>
            <span className={styles.toolLabel}>{copy.toolLabel}</span>
          </div>
        </header>

        <section className={styles.hero}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1>{copy.heroTitle}</h1>
          <p>{copy.heroDescription}</p>
        </section>

        <section className={styles.calculator} aria-labelledby="calculator-title">
          <div className={styles.inputPanel}>
            <div className={styles.panelHeading}>
              <p className={styles.step}>01</p>
              <h2 id="calculator-title">{copy.stepOne}</h2>
              <p>{copy.stepOneDescription}</p>
            </div>

            <div className={styles.distanceGrid} aria-label={copy.distanceLabel}>
              {raceEvents.map((event) => (
                <button
                  className={`${styles.distanceButton} ${event.key === selectedKey ? styles.distanceButtonActive : ''}`}
                  key={event.key}
                  type="button"
                  aria-pressed={event.key === selectedKey}
                  onClick={() => setSelectedKey(event.key)}
                >
                  {event.label}
                </button>
              ))}
            </div>

            <fieldset className={styles.timeFieldset}>
              <legend>{copy.finishTime}</legend>
              <div className={styles.timeInputs}>
                <label>
                  <input aria-label={copy.hours} inputMode="numeric" max="23" min="0" value={time.hours} onChange={(event) => updateTime('hours', event.target.value)} />
                  <span>{copy.hours}</span>
                </label>
                <label>
                  <input aria-label={copy.minutes} inputMode="numeric" max="59" min="0" value={time.minutes} onChange={(event) => updateTime('minutes', event.target.value)} />
                  <span>{copy.minutes}</span>
                </label>
                <label>
                  <input aria-label={copy.seconds} inputMode="numeric" max="59" min="0" value={time.seconds} onChange={(event) => updateTime('seconds', event.target.value)} />
                  <span>{copy.seconds}</span>
                </label>
              </div>
            </fieldset>

            <button className={styles.resetButton} type="button" onClick={resetCalculator}>{copy.reset}</button>
          </div>

          <div className={styles.resultPanel} aria-live="polite">
            <p className={styles.step}>02</p>
            {vdot === null ? (
              <div className={styles.emptyResult}>
                <h2>{hasValidClock ? copy.invalidResult : copy.incompleteTime}</h2>
                <p>{hasValidClock ? copy.invalidResultDescription : copy.incompleteTimeDescription}</p>
              </div>
            ) : (
              <>
                <p className={styles.resultLabel}>{copy.currentVdot}</p>
                <p className={styles.vdotValue}>{vdot.toFixed(1)}</p>
                <p className={styles.resultCaption}>{copy.resultCaption(selectedEvent.label, formatDuration(seconds))}</p>
                <div className={styles.resultRule} />
                <p className={styles.resultNote}>{copy.resultNote}</p>
              </>
            )}
          </div>
        </section>

        {vdot !== null && (
          <section className={styles.predictionSection} aria-labelledby="prediction-title">
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>{copy.equivalentEyebrow}</p>
                <h2 id="prediction-title">{copy.equivalentTitle}</h2>
              </div>
              <p>{copy.equivalentDescription}</p>
            </div>
            <div className={styles.predictionTable} role="table" aria-label={copy.equivalentTitle}>
              <div className={`${styles.predictionRow} ${styles.predictionHeader}`} role="row">
                <span role="columnheader">{copy.distanceColumn}</span><span role="columnheader">{copy.predictionColumn}</span><span role="columnheader">{copy.paceColumn}</span>
              </div>
              {predictions.map((prediction) => (
                <div className={`${styles.predictionRow} ${prediction.key === selectedKey ? styles.currentRace : ''}`} key={prediction.key} role="row">
                  <span role="cell">{copy.distances[prediction.key]}{prediction.key === selectedKey && <em>{copy.currentInput}</em>}</span>
                  <strong role="cell">{formatDuration(prediction.finishTime)}</strong>
                  <span role="cell">{formatPace(prediction.pace)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className={styles.guidance}>
          <p className={styles.eyebrow}>{copy.guidanceEyebrow}</p>
          <h2>{copy.guidanceTitle}</h2>
          <p>{copy.guidanceDescription}</p>
          <a href={copy.articleUrl}>{copy.articleLink} <span>→</span></a>
        </section>

        <footer className={styles.footer}>
          <p>{copy.footerNote}</p>
          <a href={copy.brandHomeUrl}>{copy.footerLink}</a>
        </footer>
      </div>
    </main>
  );
}
