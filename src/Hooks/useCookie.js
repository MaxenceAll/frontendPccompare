import { useState } from "react";

const useCookie = (name, defaultValue = null) => {

    const getCookie = (name) => {        
        return (
            document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop()
        );
    };

    const [value, setValue] = useState(getCookie(name) ?? defaultValue);

    const setCookie = (value, options = {}) => {
        let cookie = name + "=" + value;
        if (value === null) {
            cookie = name+ "=;max-age=0";
            document.cookie = cookie;
            setValue(null);
            return;
        }
        for (let optionKey in options){
            cookie+="; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                cookie+= "=" + optionValue;
            }
        }
        document.cookie = cookie;
        setValue(cookie);
    };

    return [value, setCookie];
};

export default useCookie;