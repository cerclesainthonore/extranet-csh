import {ReactNode} from "react";

const Map = (): ReactNode => {
    return (
        <div className="map">
            <iframe width="500" height="500" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"
                    id="gmap_canvas"
                    src="https://maps.google.com/maps?width=500&amp;height=500&amp;hl=fr&amp;q=296%20rue%20Saint-Honor%C3%A9%20Paris+(Paroisse%20Saint-Roch)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
            {/*{<a href='http://maps-generator.com/fr'>Map Générateur</a>}*/}
            <script type='text/javascript'
                    src='https://embedmaps.com/google-maps-authorization/script.js?id=be45dfb22ff47ae0ffa87a484a661e64277c5048'></script>
        </div>
    )
}

export {Map}