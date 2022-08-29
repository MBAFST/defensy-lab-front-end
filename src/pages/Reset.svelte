<script lang="ts">
	import axios from "axios";
	import { push } from "svelte-spa-router";

	let password: String = "";
	let passwordConfirm: String = "";

    export let params;

	$: submit = async () => {
		await axios.post("reset", {
            "token": params.token,
            "password": password,
			"password-confirm": passwordConfirm
		});

		await push("/login");
	};
</script>

<main class="form-signin w-100 m-auto">
	<form on:submit|preventDefault="{submit}">
		<h1 class="h3 mb-3 fw-normal">Please reset your password</h1>

		<div class="form-floating">
			<input bind:value="{password}" type="password" class="form-control" placeholder="Password">
			<label>Password</label>
		</div>

		<div class="form-floating">
			<input bind:value="{passwordConfirm}" type="password" class="form-control" placeholder="Password Confirm">
			<label>Password Confirm</label>
		</div>

		<button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
	</form>
</main>
