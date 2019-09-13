import React, {useState,useRef,useEffect} from 'react';
import { useTransition, animated } from 'react-spring'
import Contact from './Contact.js'
import Projects from './Projects.js'
import Logo from './Logo.js'

const Nav = (props)=> {
//Keep track of which menu is currently seleced
//Close Menus that aren't selected
    let [navState,setNavState] = useState(false)

    let [menu,setMenu] = useState('none')
    function toggleMenu(menu){
        setMenu(menu)
    }  

    function checkActiveSection(){
        if (props.activeSection != 'nav'){
            setNavState(false)
        }
    }
    function handleClick(){
        setNavState(true)
        props.onClick()
    }

    useEffect(() => {
        checkActiveSection()
        // window.addEventListener('resize',handleCollapse)
        // return() => window.removeEventListener('resize',handleCollapse)
        // return()=> console.log("Use Effect Return")
    })
    
    return(
        
        
            <div className='container-fluid nav-wrap'>
                <div className='row' onClick={handleClick}>
                <Logo className='logo'/>
                <div className='nav-spacer'></div>
                {/* Filler Item */}
                    <div className='menu-lv1'>
                        <div toggleMenu={toggleMenu}>Home</div>
                    </div>
                {/* Projects */}
                    <div className='menu-lv1'>
                        <Projects refs={props.refs} navState={navState} menu={menu} toggleMenu={toggleMenu}></Projects>                            
                    </div>
                {/* Contact */}
                    <div className='menu-lv1'>
                        <Contact navState={navState} menu={menu} toggleMenu={toggleMenu}></Contact>
                    </div>
                {/* Filler Item */}
                    <div className='menu-lv1'>
                            <div toggleMenu={toggleMenu}>About</div>
                    </div>
                    <div className='nav-spacer'></div>
                </div>
            </div>

        

    )
}

export default Nav