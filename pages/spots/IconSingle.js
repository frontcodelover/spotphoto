import L from 'leaflet';
// import locationMarker from '../assets/svg/location.svg';

 const Icon = new L.Icon({
    iconUrl: locationMarker,
    iconRetinaUrl: '../assets/svg/location.svg',
    iconAnchor: [17, 46],
    iconSize: [35, 46],
    className: 'leaflet-div-icon-two'
});

export default Icon