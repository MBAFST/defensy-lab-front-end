<script lang="ts">
	import Home from "./pages/Home.svelte";
	import Login from "./pages/Login.svelte";
	import Signup from "./pages/Signup.svelte";
	import Forgot from "./pages/Forgot.svelte";
	import Reset from "./pages/Reset.svelte";
	import Router, { link } from "svelte-spa-router";
	import Nav from "./components/Nav.svelte";
	import User from "./pages/User.svelte";
	import Admin from "./pages/Admin.svelte";

	const routes = {
		"/": Home,
		"/login": Login,
		"/sign-up": Signup,
		"/forgot": Forgot,
		"/admin": Admin,
		"/reset/:token": Reset,
		"/user/:id": User
	};
</script>

<Nav/>

<Router {routes}/>