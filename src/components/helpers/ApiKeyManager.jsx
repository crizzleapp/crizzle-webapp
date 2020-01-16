import React, {useState, useEffect, useContext, createContext} from "react"
import {useAuth0} from "../auth/Auth"

export const ApiKeyContext = createContext();

export const useApiKeyManager = () => useContext(ApiKeyContext);

export const ApiKeyProvider = ({children}) => {
    const {loading, user, managementRequest} = useAuth0();
    const [apiKeys, setApiKeys] = useState({});
    const [remoteApiKeysChanged, setRemoteApiKeysChanged] = useState(true);
    const [localApiKeysChanged, setLocalApiKeysChanged] = useState(false);

    useEffect(() => {  // Fetch remote API Keys
        if (!loading && user && remoteApiKeysChanged) {
            managementRequest({
                endpoint: `users/${user.sub}`,
                method: "GET"
            }).then((data) => {
                let keys = data.user_metadata["apiKeys"];
                setApiKeys(keys);
                setRemoteApiKeysChanged(false);
                return keys
            });
        }
    }, [remoteApiKeysChanged, loading, user, managementRequest]);

    useEffect(() => {  // Update remote API Keys
        if (!loading && user && localApiKeysChanged) {
            managementRequest({
                endpoint: `users/${user.sub}`,
                method: "PATCH",
                data: {"user_metadata": {"apiKeys": apiKeys}}
            }).then((response) => {
                setLocalApiKeysChanged(false);
                setRemoteApiKeysChanged(true);
                console.log("Remote update!");
                console.log(response);
            });
        }
    }, [localApiKeysChanged, apiKeys, loading, user, managementRequest]);

    const deleteApiKey = (name) => {
        setApiKeys({...apiKeys, [name]: undefined});
        setLocalApiKeysChanged(true);
    };

    const updateApiKey = (name, data, newName) => {
        newName = newName || name;
        if(newName !== name) {
            // TODO: Delete old API Key
        }
        setApiKeys({...apiKeys, [name]: data});
        setLocalApiKeysChanged(true);
    };

    return (
        <ApiKeyContext.Provider
            value={{
                apiKeys,
                localApiKeysChanged,
                deleteApiKey,
                updateApiKey,
            }}
        >
            {children}
        </ApiKeyContext.Provider>
    );
};