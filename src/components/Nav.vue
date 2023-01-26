<script setup>
import { createVNode, h } from 'vue';
import { NMenu, NIcon } from 'naive-ui';
import { RouterLink } from 'vue-router';
import logo from '../assets/logo.png';
import {
	PersonFilled as personIcon,
	LogOutOutlined as logoutIcon,
} from '@vicons/material';
import { useRouter } from 'vue-router';

const props = defineProps({ username: String });
const router = useRouter();
const menuOptions = [
	{
		label: () =>
			createVNode(
				RouterLink,
				{ to: { name: 'dashboard' } },
				{
					default: () =>
						createVNode('img', {
							src: logo,
							alt: 'Logo',
							style: 'width: 100px',
						}),
				}
			),
		key: 'label',
	},
	{
		label: `${props.username?.toUpperCase()}`,
		key: 'username',
		icon: () => createVNode(NIcon, {}, { default: () => h(personIcon) }),
	},
	{
		label: () =>
			createVNode(
				'div',
				{ onClick: handleLogout },
				{ default: () => 'Logout' }
			),
		key: 'logout',
		icon: () =>
			createVNode(
				NIcon,
				{ onClick: handleLogout },
				{ default: () => h(logoutIcon) }
			),
	},
];
function handleLogout() {
	localStorage.removeItem('currentUser');
	router.push({ name: 'login' });
}
</script>

<template #header>
	<n-menu class="nav mb-6" mode="horizontal" :options="menuOptions" />
</template>

<style lang="scss" scoped>
.nav {
	border-bottom: 1px solid;
	:last-child {
		margin-left: auto;
	}
}
</style>
