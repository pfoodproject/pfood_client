import React from 'react';
import Partner from '../../layouts/Partner';
import Minimal from '../../layouts/Minimal';
import Loadable from "react-loadable";
import MyLoadingComponent from "../../components/LoadingComponent";
import { useStore, useDispatch } from 'react-redux';
import {mlts} from '../../pages/partner/Account/actions'

const PartnerTemp = (props) => {

    const LoginPage = Loadable({
        loader: () => import("../../pages/partner/SignIn"),
        loading: MyLoadingComponent
      });
      
    const store = useStore();
    const dispatch = useDispatch();
    const comp = (privateComponent, path) => {
        if ((localStorage.getItem("sessionpartner") && ((new Date(JSON.parse(localStorage.getItem("sessionpartner")).token.expires) - new Date()) >= 0)) && store.getState().partnerInfo && path!=='/partner/sign-up') {
           return privateComponent
        }
        if((localStorage.getItem("sessionpartner") && ((new Date(JSON.parse(localStorage.getItem("sessionpartner")).token.expires) - new Date()) >= 0)) && store.getState().partnerInfo === null && path!=='/partner/sign-up'){            
            dispatch(mlts(JSON.parse(localStorage.getItem("sessionpartner"))))
            return privateComponent
        }
        if(path==='/partner/sign-up'){
            localStorage.removeItem("sessionpartner");
            return privateComponent
        }
        localStorage.removeItem("sessionpartner")
        return LoginPage
    }
    const lay = (layout) => {
        
        if ((localStorage.getItem("sessionpartner") && ((new Date(JSON.parse(localStorage.getItem("sessionpartner")).token.expires) - new Date()) >= 0)) ) {
           return layout
        }        
        return 'Minimal'
    }

        let Component = comp(props.component, props.path);        
        let route = props.route;
        let layout = lay(props.layout);
        console.log(props.component);
        
        return (
            <div> {layout==='Minimal' ? (
                <Minimal>
                    <Component route={route} />
                </Minimal>
              ) : (
                <Partner>
                    <Component route={route} />
                </Partner>
              )}
            </div>
        );
    
}

export default PartnerTemp;
