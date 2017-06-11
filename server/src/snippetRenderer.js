import _ from "lodash";
import moment from "moment";
import nunjucks from "nunjucks";
import config from "./configReader";
import userList from "./userList";

class SnippetRenderer {
    constructor(templateFile, dynamicContext = null) {
        this.templateFile = templateFile;
        this.dynamicContext = dynamicContext;
        this.staticContext = {
            config: config
        };
    }

    render(passedContext = {}) {
        // merge static, dynamic and passed context
        let context = this.staticContext;
        if (typeof this.dynamicContext === "function") {
            _.assign(context, this.dynamicContext());
        }
        _.assign(context, passedContext);
        return nunjucks.render(this.templateFile, context);
    }
}

export const SystemMessageRenderer = new SnippetRenderer("snippets/systemMessage.nunjucks", function () {
    return {
        timestamp: moment().format(config.get("server.timestampFormat"))
    }
});

export const UserListRenderer = new SnippetRenderer("snippets/userList.nunjucks", function () {
    return {
        userList: userList.getList()
    }
});

export const ChatMessageRenderer = new SnippetRenderer("snippets/chatMessage.nunjucks", function () {
    return {
        timestamp: moment().format(config.get("server.timestampFormat"))
    }
});