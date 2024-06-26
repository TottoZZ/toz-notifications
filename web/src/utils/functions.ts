declare function GetParentResourceName(): string;

const postRequest = (event: string, data?: any, cb?: (response: any, error?: Error | null) => void) => {
    let request = new XMLHttpRequest();

    request.open("POST", `https://${GetParentResourceName()}/${event}`, true)
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                if (typeof cb === "function") {
                    try {
                        const response = JSON.parse(request.responseText);
                        cb(response);
                    } catch (e) {
                        cb(null, new Error("Failed to parse response JSON"));
                    }
                }
            } else {
                if (typeof cb === "function") {
                    cb(null, new Error(`Error: ${request.status}`));
                }
            }
        }
    };
    request.send(JSON.stringify(data));
};

export { postRequest };
