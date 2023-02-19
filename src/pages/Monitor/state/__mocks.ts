const urls = JSON.stringify([
    {
        "url": "https://proxy.omnistar.io:8082",
        "label": "oracle",
        "frequency": 1
    },
    {
        "url": "https://proxy.omnistar.io:9092",
        "label": "snapshotNode",
        "frequency": 2
    },
    {
        "url": "http://devnet-full-1.omnistar.io:8080",
        "label": "mpc",
        "frequency": 3
    },
    {
        "url": "http://devnet-full-1.omnistar.io:1317",
        "label": "ledgerNode",
        "frequency": 4
    }
]);

export {
    urls
}