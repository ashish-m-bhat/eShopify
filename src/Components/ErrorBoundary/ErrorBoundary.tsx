import { Component, ReactNode } from "react";

interface Props {
    children: ReactNode;
};

interface State {
    isError: boolean;
    message: Error | null
};

export default class ErrorBoundary extends Component<Props, State>{
    public state: State = { isError:false, message: null };

    componentDidCatch(error: Error){
        this.setState({isError: true, message:error})
        console.log(error);
    }
    render(){
        if(this.state.isError)
            return <h1>OOps</h1>

        return (this.props.children)
    }
}
