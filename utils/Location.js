import Geocoder from 'react-native-geocoder';
import Geolocation from '@react-native-community/geolocation';

export const GetLocation = () => {

    return new Promise((resolve, reject) => {
        const onReceiveLocation = (geolocation) => {
            resolve(geolocation)
        }
        const error = (error) => {
            reject(error)
        }
        Geolocation.getCurrentPosition(onReceiveLocation, error);
    });
};

export const GetCountry = ({ lat, lng }) => {

    /*
    return new Promise((resolve, reject) => {
        Geocoder.geocodePosition({ lat, lng }).then((location) => {
            resolve(location[0].countryCode)

        }).catch((error) => {
            reject(error)
        })
    });
     */
    return new Promise((resolve, reject) => {
        Geocoder.geocodePosition(
            { lat, lng }
        ).then((location) => {
            location.forEach(function(value) {
                if(value.countryCode !== null){
                    resolve(value.countryCode);
                }
            });
        }).catch((error) => {
            reject(error);
        });
    });
}