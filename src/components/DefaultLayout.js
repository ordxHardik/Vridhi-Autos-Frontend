import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
    MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, LogoutOutlined,
    HomeOutlined, CopyOutlined, UnorderedListOutlined,
} from "@ant-design/icons";
import "../styles/DefaultLayout.css";
import Spinner from "./Spinner";

const { Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
    const navigate = useNavigate();
    const { cartItems, loading } = useSelector((state) => state.rootReducer);
    const [collapsed, setCollapsed] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const isLoggedIn = localStorage.getItem("auth");

    const toggle = () => {
        if (isMobile) {
            setSidebarVisible(!sidebarVisible);
        } else {
            setCollapsed(!collapsed);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (mobile) {
                setSidebarVisible(false);
            } else {
                setCollapsed(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <>
            <style>{`
                * { box-sizing: border-box; }

                /* ── RESET: allow page to scroll naturally ── */
                html, body, #root {
                    height: auto;
                    min-height: 100%;
                    margin: 0;
                    padding: 0;
                    overflow-x: hidden;
                    overflow-y: auto;
                }

                @keyframes fadeSlideIn {
                    from { opacity: 0; transform: translateX(-16px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes contentFade {
                    from { opacity: 0; transform: translateY(10px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* ── OUTER WRAPPER ── */
                .jauter-outer {
                    display: flex;
                    min-height: 100vh;
                    background: #f0f0f0;
                    position: relative;
                }

                /* ── SIDER ── */
                .jauter-sider {
                    background: #111111 !important;
                    box-shadow: 2px 0 16px rgba(0,0,0,0.2);
                    /* Fixed on desktop so it doesn't scroll away */
                    position: sticky;
                    top: 0;
                    height: 100vh;
                    flex-shrink: 0;
                    overflow-y: auto;
                    overflow-x: hidden;
                    z-index: 100;
                }
                .jauter-sider::-webkit-scrollbar { width: 6px; }
                .jauter-sider::-webkit-scrollbar-track { background: #1a1a1a; }
                .jauter-sider::-webkit-scrollbar-thumb { background: #c8f000; border-radius: 3px; }
                .jauter-sider::-webkit-scrollbar-thumb:hover { background: #b8e000; }

                .jauter-sider .ant-layout-sider-children {
                    background: transparent;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                .jauter-sider .ant-menu {
                    background: transparent !important;
                    border: none !important;
                    padding: 0 8px;
                    flex: 1;
                }
                .jauter-sider .ant-menu-item {
                    color: #aaaaaa !important;
                    border-radius: 12px !important;
                    margin: 3px 0 !important;
                    font-weight: 600;
                    transition: all 0.2s ease !important;
                    animation: fadeSlideIn 0.3s ease;
                }
                .jauter-sider .ant-menu-item:hover {
                    background-color: #1e1e1e !important;
                    color: #c8f000 !important;
                    transform: translateX(4px);
                }
                .jauter-sider .ant-menu-item-selected {
                    background-color: #c8f000 !important;
                    color: #111 !important;
                }
                .jauter-sider .ant-menu-item-selected .anticon { color: #111 !important; }
                .jauter-sider .ant-menu-item a { color: inherit !important; }
                .jauter-sider .ant-layout-sider-trigger {
                    background: #1e1e1e !important;
                    color: #c8f000 !important;
                    border-top: 1px solid #2a2a2a;
                }

                /* Sider logo */
                .jauter-sider-logo {
                    text-align: center;
                    padding: 20px 12px 16px;
                    border-bottom: 1px solid #2a2a2a;
                    margin-bottom: 8px;
                }
                .jauter-sider-logo-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: #c8f000;
                    border-radius: 50px;
                    padding: 8px 16px;
                    font-size: 14px;
                    font-weight: 900;
                    color: #111;
                    letter-spacing: -0.3px;
                }
                .jauter-sider-logo-dot {
                    width: 10px;
                    height: 10px;
                    background: #111;
                    border-radius: 50%;
                    flex-shrink: 0;
                }
                .jauter-sider-logo-collapsed {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    background: #c8f000;
                    border-radius: 50%;
                    width: 36px;
                    height: 36px;
                    font-size: 13px;
                    font-weight: 900;
                    color: #111;
                }

                /* Sider footer */
                .jauter-sider-footer {
                    margin-top: auto;
                    padding: 12px;
                    text-align: center;
                    font-size: 11px;
                    color: #555;
                    border-top: 1px solid #2a2a2a;
                }
                .jauter-sider-footer a { color: #c8f000; text-decoration: none; font-weight: 600; }
                .jauter-sider-footer a:hover { text-decoration: underline; }

                /* ── MAIN COLUMN (right of sider) ── */
                .jauter-main-col {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    min-width: 0;
                    /* NO overflow:hidden — let it grow as tall as content needs */
                }

                /* ── CONTENT ── */
                .jauter-content {
                    background: #f0f0f0 !important;
                    margin: 16px !important;
                    padding: 24px 24px 60px !important;
                    border-radius: 20px !important;
                    animation: contentFade 0.4s ease;
                    /* Key fix: no fixed height, no overflow:hidden */
                    flex: 1;
                }
                .jauter-content::-webkit-scrollbar { display: none; }

                /* ── TRIGGER ── */
                .jauter-trigger {
                    font-size: 18px;
                    color: #111;
                    cursor: pointer;
                    padding: 8px;
                    border-radius: 10px;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    background: #c8f000;
                }
                .jauter-trigger:hover { background: #b5e400; }

                /* ── MOBILE OVERLAY ── */
                .mobile-sidebar-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.5);
                    z-index: 998;
                }

                /* Mobile: sider is fixed overlay, not in flow */
                .jauter-sider-mobile {
                    position: fixed !important;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    z-index: 999;
                    width: 200px !important;
                    max-width: 200px !important;
                    height: 100vh !important;
                    overflow-y: auto;
                }

                /* Mobile toggle FAB */
                .jauter-mobile-toggle {
                    position: fixed;
                    bottom: 80px;
                    right: 20px;
                    z-index: 1000;
                    font-size: 24px;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: #c8f000 !important;
                    color: #111 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    transition: all 0.3s ease;
                    border: none;
                }
                .jauter-mobile-toggle:hover { background: #b5e400 !important; transform: scale(1.1); }

                @media (max-width: 768px) {
                    .jauter-content { margin: 8px !important; padding: 14px 14px 50px !important; }
                }
                @media (max-width: 480px) {
                    .jauter-content { margin: 6px !important; padding: 10px 10px 44px !important; border-radius: 14px !important; }
                    .jauter-mobile-toggle { bottom: 70px; right: 15px; width: 45px; height: 45px; font-size: 20px; }
                }

                @media (prefers-reduced-motion: reduce) {
                    .jauter-content { animation: none; }
                }
            `}</style>

            {loading && <Spinner />}

            <div className="jauter-outer">

                {/* ── DESKTOP SIDER (sticky, in-flow) ── */}
                {isLoggedIn && !isMobile && (
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                        className="jauter-sider"
                        width={200}
                        collapsedWidth={80}
                    >
                        <div className="jauter-sider-logo">
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                                {!collapsed ? (
                                    <div className="jauter-sider-logo-pill">
                                        <span className="jauter-sider-logo-dot" />
                                        Vridhi Autos
                                    </div>
                                ) : (
                                    <div className="jauter-sider-logo-collapsed">VA</div>
                                )}
                                {React.createElement(
                                    collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                                    {
                                        className: "jauter-trigger",
                                        onClick: toggle,
                                        style: { marginLeft: collapsed ? "0" : "auto" },
                                    }
                                )}
                            </div>
                        </div>
                        <Menu mode="inline" defaultSelectedKeys={[window.location.pathname]}>
                            <Menu.Item key="/" icon={<HomeOutlined />}><Link to="/">Home</Link></Menu.Item>
                            <Menu.Item key="/bills" icon={<CopyOutlined />}><Link to="/bills">Bills</Link></Menu.Item>
                            <Menu.Item key="/items" icon={<UnorderedListOutlined />}><Link to="/items">Items</Link></Menu.Item>
                            <Menu.Item key="/customers" icon={<UserOutlined />}><Link to="/customers">Customers</Link></Menu.Item>
                            <Menu.Item key="/logout" icon={<LogoutOutlined />}
                                onClick={() => { localStorage.removeItem("auth"); navigate("/login"); }}>
                                Logout
                            </Menu.Item>
                        </Menu>
                    </Sider>
                )}

                {/* ── MOBILE SIDER (fixed overlay) ── */}
                {isLoggedIn && isMobile && sidebarVisible && (
                    <>
                        <div className="mobile-sidebar-overlay" onClick={() => setSidebarVisible(false)} />
                        <Sider
                            trigger={null}
                            className="jauter-sider jauter-sider-mobile"
                            width={200}
                            collapsedWidth={0}
                        >
                            <div className="jauter-sider-logo">
                                <div className="jauter-sider-logo-pill">
                                    <span className="jauter-sider-logo-dot" />
                                    Vridhi Autos
                                </div>
                            </div>
                            <Menu mode="inline" defaultSelectedKeys={[window.location.pathname]}>
                                <Menu.Item key="/" icon={<HomeOutlined />}
                                    onClick={() => setSidebarVisible(false)}>
                                    <Link to="/">Home</Link>
                                </Menu.Item>
                                <Menu.Item key="/bills" icon={<CopyOutlined />}
                                    onClick={() => setSidebarVisible(false)}>
                                    <Link to="/bills">Bills</Link>
                                </Menu.Item>
                                <Menu.Item key="/items" icon={<UnorderedListOutlined />}
                                    onClick={() => setSidebarVisible(false)}>
                                    <Link to="/items">Items</Link>
                                </Menu.Item>
                                <Menu.Item key="/customers" icon={<UserOutlined />}
                                    onClick={() => setSidebarVisible(false)}>
                                    <Link to="/customers">Customers</Link>
                                </Menu.Item>
                                <Menu.Item key="/logout" icon={<LogoutOutlined />}
                                    onClick={() => { localStorage.removeItem("auth"); navigate("/login"); }}>
                                    Logout
                                </Menu.Item>
                            </Menu>
                        </Sider>
                    </>
                )}

                {/* ── MAIN CONTENT COLUMN ── */}
                <div className="jauter-main-col">
                    <Content className="jauter-content">
                        {children}
                    </Content>
                </div>

            </div>

            {/* Mobile FAB toggle */}
            {isMobile && isLoggedIn && (
                <button className="jauter-mobile-toggle" onClick={toggle}>
                    {React.createElement(sidebarVisible ? MenuFoldOutlined : MenuUnfoldOutlined)}
                </button>
            )}
        </>
    );
};

export default DefaultLayout;