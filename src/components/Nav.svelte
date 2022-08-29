<script lang="ts">
    import { link } from "svelte-spa-router";
    import { authenticated } from "../store/auth";
    import axios from "axios";
	import logo from "../assets/logo.png";

	let auth: Boolean = false;
	authenticated.subscribe(value => auth = value);

	$: logout = async () => {
		await axios.post('logout', {}, { withCredentials: true });
		axios.defaults.headers.common["Authorization"] = "";
		authenticated.set(false);
	}
</script>

<header class="p-3 text-bg-dark">
    <div class="container">
		<div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
			<ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
				<li>
					<a href="https://www.defensy.io/" class="nav-link px-2 text-white"><img src={logo} alt=""></a>
				</li>
			</ul>

			{#if auth}
				<div class="text-end">
					<a href="/" use:link type="button" class="btn btn-outline-light me-2" on:click={logout}>Logout</a>
				</div>
			{:else}
				<div class="text-end">
					<a href="/login" use:link type="button" class="btn btn-outline-light me-2">Login</a>
					<a href="/sign-up" use:link type="button" class="btn btn-outline-light me-2">Sign-up</a>
				</div>
			{/if}
      </div>
    </div>
</header>
<style>
	img {
		width: 200px;
		height: 100px;
	}
</style>