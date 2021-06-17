import React , {Component} from 'react';

export default class Form extends Component{
    render(){
        return (
            <form>
                <button>
                    ok
                </button>
                <input type="text" placeholder="name"></input>
                <div type="text">
                    <section>
                        <button>NOSE</button>
                        <input type="password"></input>
                    </section>
                </div>
            </form>
        )
    }
}