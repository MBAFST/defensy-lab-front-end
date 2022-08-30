<script lang="ts">
	import axios from "axios";
	import { push } from "svelte-spa-router";

	let password: String = "";
	let passwordConfirm: String = "";

    export let params;

	async function handlePassword() {
		if (isValidPassword && isValidCPassword ) {
			await axios.post("reset", {
            "token": params.token,
            "password": password,
			"password-confirm": passwordConfirm
		});

		await push("/login");
		}
		
	};

  $: isValidPassword = password.length > 8;
  $: isValidCPassword = passwordConfirm == password;
</script>

<main class="form-signin w-100 m-auto">

		<h1 class="h3 mb-3 fw-normal">Reset your password</h1>

		<div class="form-floating">
			<input bind:value="{password}" type="password" class="form-control" placeholder="Password">
			<label>Password</label>
			{#if !isValidPassword} 
			<p class="validation-error">Please enter a <strong>Strong</strong> password</p>
			{/if}

		</div>

		<div class="form-floating">
			<input bind:value="{passwordConfirm}" type="password" class="form-control" placeholder="Password Confirm">
			<label>Password Confirm</label>
			{#if !isValidCPassword} 
			<p class="validation-error">Passwords does not match!</p>
			{/if}
		</div>

		<button on:click="{handlePassword}" class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
</main>

<style>
	.form-floating .form-control{
		margin-bottom: 30px;
		width: 400px;
		border: 0;
		border-bottom: 1px solid #212529;
		border-radius: 0;
	}
	.btn {
		margin-top: 10px;
		background-color: transparent;
		color:#132a6a;
		border-color: #ef5f55;
	}
	.validation-error {
    color: rgba(255, 0, 0, 0.425);
    margin-top: 5px;
  }
  h1 {
	width: 400px;
    color: #132a6a;
  }
</style>