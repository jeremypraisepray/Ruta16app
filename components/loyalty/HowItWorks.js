import { PROGRAM } from '@/data/loyalty/program';

/** Come · Gana · Regresa — three stops, from data/loyalty/program.js. */
export function HowItWorks({ withFineprint = false }) {
  return (
    <section className="mr-how" aria-labelledby="mr-how-h">
      <h2 id="mr-how-h" className="mr-section__title">
        CÓMO FUNCIONA
      </h2>
      <ol className="mr-how__steps">
        {PROGRAM.howToEarn.map((s, i) => (
          <li key={s.title}>
            <span className={`ring mr-how__ring${i % 2 ? ' ring--blue' : ''}`}>{`0${i + 1}`}</span>
            <span className="mr-how__title">{s.title}</span>
            <span className="mr-how__text">{s.text}</span>
          </li>
        ))}
      </ol>
      {withFineprint && (
        <ul className="mr-how__fine">
          {PROGRAM.fineprint.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
