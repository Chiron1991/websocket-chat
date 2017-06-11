import _ from "lodash";
import moment from "moment";
import pug from "pug";
import path from "path";
import config from "./configReader";
import userList from "./userList";

class SnippetRenderer {
    constructor(templateFile, dynamicContext = null) {
        this.templateFile = path.resolve(__dirname, "../templates/snippets/" + templateFile);
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
        return pug.renderFile(this.templateFile, context);
    }
}

export const SystemMessageRenderer = new SnippetRenderer("systemMessage.pug", function () {
    return {
        timestamp: moment().format(config.get("server.timestampFormat"))
    }
});

export const UserListRenderer = new SnippetRenderer("userList.pug", function () {
    return {
        userList: userList.getList()
    }
});

export const ChatMessageRenderer = new SnippetRenderer("chatMessage.pug", function () {
    return {
        timestamp: moment().format(config.get("server.timestampFormat"))
    }
});