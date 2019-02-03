import {Component} from "react";
import dat from "dat.gui";

class GUI extends Component<any, any> {

    static data: Object = {};

    constructor(props: Object) {
        super(props);
        this.state = {
            gui: Object
        }
    }

    componentDidMount(): void {
        const gui = new dat.GUI({name: "Testing GUI"});
        this.setState({gui});
    }

    render() {
        return null;
    }
}

export default GUI;