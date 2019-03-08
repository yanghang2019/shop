import { Layout, Menu, Icon } from 'antd';
import * as React from "react";

const { Header, Sider, Content } = Layout;

interface SiderDemoProps {
	visible: boolean
}

interface SiderDemoStates {
	collapsed: boolean,
	key: string;
};

export class SiderDemo extends React.Component<SiderDemoProps, SiderDemoStates> {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
			key: "1"
		};
	}

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	}

	handleSelMenu = (value) => {
		this.setState({
			key: value
		})
	}

	render() {
		const { key } = this.state
		return (
			<Layout>
				<Sider
					trigger={null}
					collapsible
					collapsed={this.state.collapsed}
				>
					<div className="logo" />
					<Menu theme="dark" mode="inline" defaultSelectedKeys={[key]} onSelect={this.handleSelMenu}>
						<Menu.Item key="1">
							<Icon type="user" />
							<span>nav 1</span>
						</Menu.Item>
						<Menu.Item key="2">
							<Icon type="video-camera" />
							<span>nav 2</span>
						</Menu.Item>
						<Menu.Item key="3">
							<Icon type="upload" />
							<span>nav 3</span>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout>
					<Header style={{ background: '#fff', padding: 0 }}>
						<Icon
							className="trigger"
							type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
							onClick={this.toggle}
						/>
					</Header>
					{
						key === "1" ? (
							<Content style={{
								margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
							}}
							>
								Content
	  </Content>
						) : (
								<Content style={{
									margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
								}}
								>
									Test Content111
				  </Content>
							)
					}
				</Layout>
			</Layout>
		);
	}
}