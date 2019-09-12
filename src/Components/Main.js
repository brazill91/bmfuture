import React, {useState,useMedia,useEffect,useRef} from 'react';
import { useMediaQuery } from '@material-ui/core';
import './Main.css';
import Project from './Project.js'
import Nav from './Nav.js'
import NavSide from './NavSide.js'


const Main = ()=> {

    // Use Refs to navigate to each project section
    let refGecko = useRef(null)
    let refAtomist = useRef(null)
    let refList = {
        'gecko':refGecko,
        'atomist':refAtomist,
    }

    
    const mediaSm = '(min-width:400px)'
    const menuCollapseSize = '(max-width:600px)'
    const menuFullSize = '(min-width:800px)'
    const mediaLg = '(min-width:1200px)'
    const mqList = [mediaSm,menuFullSize,mediaLg]

    let [isNavCollapsed,setIsNavCollapsed] = useState(false)
    
    function toggleNav(){
         if (window.matchMedia(menuCollapseSize).matches){
             setIsNavCollapsed(true)
         }else{
             setIsNavCollapsed(false)
         }
    }

    let [activeSection,setActiveSection] = useState('none')
    function updateSection(element){
        setActiveSection(element)
        console.log(activeSection)
    }

    let expanded = 'col-lg-2 col-md-3 col-sm-3'

    // Match current screen size to list of sizes
    function handleScreen(){
        toggleNav()
    }


    useEffect(() => {
        
        window.addEventListener('resize',handleScreen)
        return() => window.removeEventListener('resize',handleScreen)
    },handleScreen)

    //Give the body an onClick Handler
    const BodyWrapper= (props)=> {
        return(
            <div>
            
                <Body></Body>
            
            </div>
        )}

    const Body= (props)=> {
        function setBodyActive(){
            updateSection('body')
        }
        return(
        <div onClick={setBodyActive}>
            <div className='row top-spacer'></div>
                <div className='row'>
                    <div className='col-10 top-divider mx-auto'></div>
                </div>
                <div className='row'>                   
                    
                    <div className='col'>
                        <Project refs={refList}/>
                    </div>
                </div>
        </div>
    )}
    
    function setNavActive(){
        updateSection('nav')
    }
    return (
        <div>
            <div className='container-fluid'>
                {isNavCollapsed
                    ?<NavSide refs={refList} activeSection={activeSection} updateSection={updateSection} onClick={setNavActive} />
                    :<Nav refs={refList} activeSection={activeSection} updateSection={updateSection} onClick={setNavActive} />
                }
                <BodyWrapper />
            </div>
            
        </div>
    )
  
}

export default Main