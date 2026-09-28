import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import MenuBoard from '@/components/MenuBoard';

export const metadata = {
  title: 'El Menú',
  description:
    'Ocho paradas en la ruta del sabor — appetizers, Zona Culichi, ruta caliente, mariscos del asador, parrilladas, tacos, morritos y cheves.',
};

export default function MenuPage() {
  return (
    <>
      <SiteNav />

      <MenuBoard
        header={
          <>
            <div className="menuHead__eyebrow">MARISCOS · SINALOA STYLE · Y MÁS</div>
            <h1 className="menuHead__title">EL MENÚ</h1>
            <p className="menuHead__sub">
              Ocho paradas en la ruta del sabor. Elige tu parada — o recorre la ruta completa.
            </p>
          </>
        }
      />

      <div className="menuNote">
        <div className="menuNote__tag">GRACIAS POR VIAJAR LA RUTA DEL SABOR</div>
        <div className="menuNote__fine">
          15% gratuity added after a $100 purchase · $MP = market price · precios sujetos a cambio
        </div>
        <div className="menuNote__advisory">
          <p>Please tell your server about any food allergies before you order.</p>
          <p>
            Consuming raw or undercooked oysters, seafood or meat may increase your risk of
            foodborne illness — especially for pregnant women and anyone with a medical condition.
          </p>
        </div>
      </div>

      <div className="barSplit" aria-hidden="true">
        <i />
        <i />
      </div>
    </>
  );
}
