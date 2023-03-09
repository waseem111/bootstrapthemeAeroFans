import React from 'react'

const LeftSideBar = () => {
  return (

<>
<div className="l-sidebar">
    <div className="logo">
        <div className="logo__txt">
            <img  className="icon1" src="https://aeronautfans.com/wp-content/uploads/2022/10/aerologo.png" style={{width: "60%"}} alt='' />
        <img className="icon2" src="https://aeronautfans.com/wp-content/uploads/2022/10/cropped-favicon-180x180.png" style={{width: "70%",borderRadius: "24px"}} alt='' />
        </div>
    </div>
    <div className="l-sidebar__content">
        <nav className="c-menu js-menu">
            <ul className="u-list">
                <li className="c-menu__item is-active " data-toggle="tooltip" title="Menu1">
                    <a href="dashboard.html">
                        <div className="c-menu__item__inner"><i className="fa fa-tachometer" aria-hidden="true"></i>

                            <div className="c-menu-item__title"><span>Dashboard </span></div>
                        </div>
                    </a>
                </li>

                <li className="c-menu__item has-submenu" data-toggle="tooltip" title="Menu2">
                    <a href="index.html">
                        <div className="c-menu__item__inner"><i className="fa fa-user-o" aria-hidden="true"></i>
                            <div className="c-menu-item__title"><span>Login</span></div>

                        </div>
                    </a>


                </li>
                <li className="c-menu__item has-submenu" data-toggle="tooltip" title="Menu3">
                    <a href="forms.html">
                        <div className="c-menu__item__inner"><i className="fa fa-file" aria-hidden="true"></i>
                            <div className="c-menu-item__title"><span>Form</span></div>
                        </div>
                    </a>
                </li>
                <li className="c-menu__item has-submenu" data-toggle="tooltip" title="Menu4">
                    <div className="c-menu__item__inner"><i className="fa fa-gift"></i>
                        <div className="c-menu-item__title"><span>Menu4</span></div>
                    </div>
                </li>
                <li className="c-menu__item has-submenu" data-toggle="tooltip" title="Menu5">
                    <div className="c-menu__item__inner"><i className="fa fa-cogs"></i>
                        <div className="c-menu-item__title"><span>Menu5</span></div>
                    </div>
                </li>
            </ul>
        </nav>
    </div>
</div>
</>

  )
}

export default LeftSideBar