<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
	<RouterView></RouterView>
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	/* color: #ffffff; */
	/* background-color: #2c3e50; */
	/* background-color: #c2d9f170; */
	color: #2c3e50;
	margin: 0;
	min-height: 100vh;
	/* width: 100dvw; */
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 5rem 1fr;
	place-content: center;
}
body {
	margin: 0;
}
</style>
