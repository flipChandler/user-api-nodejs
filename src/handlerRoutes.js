const routes = require("./routes");

const handler = (request, response) => {
    const method = request.method;
    const url = request.url;

    const urlSplit = url.split("/").filter(Boolean); // não traz espaço vazio

    const resultRoute = routes.filter((route) => {
        return (
            route.method.toLowerCase() === method.toLowerCase() &&
            route.url.toLowerCase().startsWith(`/${urlSplit[0].toLowerCase()}`)
        )
    });

    const executeRoute = resultRoute.find((route) => {
        const routerUrlSplit = route.url.split("/").filter(Boolean);
        return routerUrlSplit.length === urlSplit.length;
    });

    if (!executeRoute) {
        response.statusCode = 404;
        return response.end("Not found");
    }

    const routeSplitUrl = executeRoute.url.split("/").filter(Boolean);

    const objParams = {
    }

    routeSplitUrl.forEach((item, index) => {
        if (item.startsWith(":")) {
            const formatField = item.replace(":", "");
            objParams[formatField] = urlSplit[index];
        }
    });

    request.on("data", (data) => {
        const body = JSON.parse(data);
        request.body = body;
    }).on("end", () => {
        request.params = objParams;
        return executeRoute.controller(request, response);
    });
};


module.exports = handler;

