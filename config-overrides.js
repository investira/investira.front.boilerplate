var path = require('path');
var fs = require('fs');
const {
    override,
    addDecoratorsLegacy,
    babelInclude,
    addWebpackAlias
} = require('customize-cra');

module.exports = function(config, env) {
    return Object.assign(
        config,
        override(
            addDecoratorsLegacy(),
            addWebpackAlias({
                react: path.resolve(
                    path.join(__dirname, './node_modules/react')
                ),
                formik: path.resolve(
                    path.join(__dirname, './node_modules/formik')
                ),
                investiraComponents: path.resolve(
                    path.join(
                        __dirname,
                        './node_modules/investira.react/src/components'
                    )
                ),
                investiraLib: path.resolve(
                    path.join(
                        __dirname,
                        './node_modules/investira.react/src/lib'
                    )
                )
            }),
            babelInclude([
                path.resolve('src'),
                fs.realpathSync('node_modules/investira.react/src')
            ])
        )(config, env)
    );
};
