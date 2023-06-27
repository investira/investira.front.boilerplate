import React, { useState, useEffect } from 'react';
import packageJson from '../../package.json';

const buildDateGreaterThan = (pLatestDate, pCurrentDate) => {
    if (pLatestDate > pCurrentDate) {
        return true;
    }

    return false;
};

function withClearCache(Component) {
    function ClearCacheComponent(props) {
        const [isLatestBuildDate, setIsLatestBuildDate] = useState(false);

        useEffect(() => {
            //Realiza uma chamada para meta.json, por mais que o arquivo esteja em cache os navegadores não armazenam o resultado da chamada
            fetch('/meta.json')
                .then(rRes => {
                    return rRes.json();
                })
                .then(pMeta => {
                    const xLatestVersionDate = pMeta.buildDate; // Recupera a data da build
                    const xCurrentVersionDate = packageJson.buildDate; // Última data da build em cache
                    const xShouldForceRefresh = buildDateGreaterThan(
                        xLatestVersionDate,
                        xCurrentVersionDate
                    );

                    if (xShouldForceRefresh) {
                        setIsLatestBuildDate(false);
                        refreshCacheAndReload();
                    } else {
                        setIsLatestBuildDate(true);
                    }
                });
        }, []);

        const refreshCacheAndReload = () => {
            if (caches) {
                //CacheStorage
                // O cache do Service worker deve ser limpo com caches.delete ()
                caches.keys().then(names => {
                    for (const name of names) {
                        caches.delete(name);
                    }
                });
                console.info('Build Atualizada: Cache excluído');
                // Exclui o cache do navegador e força o reload
                window.location.reload();
            }
        };

        return <>{isLatestBuildDate ? <Component {...props} /> : null}</>;
    }

    return ClearCacheComponent;
}

export default withClearCache;
