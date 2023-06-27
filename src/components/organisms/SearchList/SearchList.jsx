import React, { useRef, useState, useEffect } from 'react';
import { validators } from 'investira.sdk';
import PropTypes from 'prop-types';
import {
    CrudProvider,
    ContainerList,
    Search,
    ListState,
    ListVirtual,
    FilterBar
} from 'investira.react.components';
import { GENERIC } from '../../../const';
import withResponseHandling from '../../../hoc/withResponseHandling';

const SearchList = props => {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');
    const [isFetchingState, setIsFetching] = useState(false);
    const [pages, setPages] = useState({});

    const isMount = useRef(false);
    const paramsRef = useRef({});
    const searchRef = useRef();

    const {
        params,
        service,
        success,
        error,
        isFetching,
        preRequest,
        updateTheList,
        padding,
        onResetData,
        placeholder,
        onClear
    } = props;

    function requestList(pParams) {
        const xService = service;
        const xSuccess = success;
        const xError = error;
        const xIsFetching = isFetching;
        const xPreRequest = preRequest;
        const xParams = { ...pParams };
        const xIsSearch = !validators.isNull(pParams.pesquisa);
        let xxPreRequest = null;
        xPreRequest
            ? (xxPreRequest = xPreRequest(xIsSearch, pParams.pesquisa))
            : (xxPreRequest = null);
        if (xxPreRequest === 'cancel') {
            return;
        }
        setMessage('');
        xIsFetching && xIsFetching(true);
        setIsFetching(true);
        xService(
            xParams,
            rRes => {
                setIsFetching(false);
                xIsFetching && xIsFetching(false);
                setPages(rRes.pages);
                if (xSuccess) {
                    setData(xSuccess(rRes.data, xIsSearch, data));
                } else if (!xIsSearch && data.length > rRes.data.length) {
                    setData(Object.values({ ...data, ...rRes.data }));
                } else {
                    setData(Object.values(rRes.data));
                }
            },
            rErr => {
                xIsFetching && xIsFetching(false);
                setIsFetching(false);
                setMessage(rErr.message);
                xError && xError(rErr);
                props.responseErrorHandling(rErr);
            }
        );
    }

    function onUpdateParams(pParams) {
        paramsRef.current = { ...paramsRef.current, ...pParams };
        return paramsRef.current;
    }

    useEffect(() => {
        if (validators.isEmpty(data)) {
            setMessage(GENERIC.GENERIC.EMPTY_RESPONSE);
        }
    }, [data]);

    useEffect(() => {
        if (updateTheList && isMount.current) {
            requestList(params);
        }
    }, [updateTheList]);

    useEffect(() => {
        let xNewParams = onUpdateParams(params);
        if (validators.isEmpty(params.status)) {
            delete xNewParams.status;
        }
        isMount.current && requestList(xNewParams);
    }, [params.status]);

    useEffect(() => {
        isMount.current = true;
        onUpdateParams(params);
        requestList(params);
        return () => {
            isMount.current = false;
        };
    }, []);

    return (
        <CrudProvider
            actions={{
                onRead: requestList
            }}>
            <ContainerList
                search={
                    <Search
                        {...props}
                        ref={searchRef}
                        value={paramsRef.current.pesquisa}
                        placeholder={placeholder}
                        inputProps={{ autofocus: true }}
                        onUpdateParams={onUpdateParams}
                        onResetData={onResetData}
                        onClear={onClear}
                    />
                }
                filter={props.filterProps && <FilterBar {...props.filterProps} />}>
                <ListState
                    padding={padding}
                    listSize={data.length}
                    isFetching={isFetchingState}
                    message={message}>
                    <ListVirtual
                        {...props}
                        nextPage={pages?.next}
                        onNextPage={requestList}
                        totalItens={pages?.total_items}
                        list={data}
                        item={props.item}
                        itemProps={props.itemProps}
                    />
                </ListState>
            </ContainerList>
        </CrudProvider>
    );
};

SearchList.propTypes = {
    // {...request}
    request: PropTypes.shape({
        service: PropTypes.func.isRequired,
        success: PropTypes.func.isRequired,
        error: PropTypes.func.isRequired,
        params: PropTypes.object,
        isFetching: PropTypes.func
    }),
    updateTheList: PropTypes.bool,
    padding: PropTypes.bool,
    virtual: PropTypes.bool,
    item: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    itemProps: PropTypes.object,
    filterProps: PropTypes.object,
    placeholder: PropTypes.string
};

SearchList.defaultProps = {
    padding: false
};

export default withResponseHandling(SearchList);
