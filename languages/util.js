import I18n from 'i18n-js'
import { Platform, NativeModules } from "react-native";

const normalizeTranslate = {
    en_US: "en_US",
    pt_BR: "pt_BR",
    en: "en_US",
    pt_US: "pt_BR"
}

I18n.translations = {
    en_US: require("./en-US.json"),
    en: require("./en-US.json"),
    pt_BR: require("./pt-BR.json")
};

export const getLanguage = () => {
    const majorVersionIOS = parseInt(Platform.Version, 10)
    let locale = null;
    if (Platform.OS === 'ios') {

        //https://github.com/facebook/react-native/issues/26540

        if (majorVersionIOS == 13) {

            locale = NativeModules.SettingsManager.settings.AppleLanguages[0];

        } else {

            locale = NativeModules.SettingsManager.settings.AppleLocale;

        }

    } else {

        locale = NativeModules.I18nManager.localeIdentifier;

    }

    return locale;
}
export const configureLanguageToI18n = () => {
    
    const language = getLanguage();
    const translate = normalizeTranslate[language]
    const languageVerificate = I18n.translations.hasOwnProperty(translate);
    languageVerificate ? I18n.locale = translate : I18n.defaultLocale = 'pt_BR';
    //console.log(`Traduz ${I18n.t("Search")}`)


    //return "pt_BR";

};

export const trans = (word) => I18n.t(word);