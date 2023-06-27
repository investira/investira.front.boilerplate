const path = require('path');
const fs = require('fs');

const {
    override,
    addDecoratorsLegacy,
    babelInclude,
    addWebpackAlias,
    addBabelPlugin
} = require('customize-cra');

module.exports = function (config, env) {
    const xConfig = Object.assign(
        config,
        override(
            addDecoratorsLegacy(),
            addWebpackAlias({
                react: path.resolve(path.join(__dirname, './node_modules/react')),
                'react-redux': path.resolve(path.join(__dirname, './node_modules/react-redux')),
                formik: path.resolve(path.join(__dirname, './node_modules/formik')),
                'investira.react.components': path.resolve(
                    path.join(__dirname, './node_modules/investira.react.components/src/components')
                ),
                'investira.react.charts': path.resolve(
                    path.join(__dirname, './node_modules/investira.react.charts/src/components')
                )
            }),
            babelInclude([
                path.resolve('src'),
                fs.realpathSync('node_modules/investira.react.components/src'),
                fs.realpathSync('node_modules/investira.react.charts/src')
            ]),
            addBabelPlugin(['@babel/plugin-proposal-optional-chaining', { loose: false }]),
            addBabelPlugin(['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }])
        )(config, env)
    );

    return xConfig;
};
