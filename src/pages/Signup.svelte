<script lang="ts">
	import axios from "axios";
	import { push } from "svelte-spa-router";

	let username: String = "";
	let firstName: String = "";
	let lastName: String = "";
	let email: String = "";
	let password: String = "";
	let passwordConfirm: String = "";

	$: submit = async () => {
		await axios.post("register", {
			"username": username,
			"first-name": firstName,
			"last-name": lastName,
			"email": email,
			"password": password,
			"password-confirm": passwordConfirm
		});

		await push("/login");
	};
</script>

<main class="form-signin w-100 m-auto">
	<form on:submit|preventDefault="{submit}">
		<h1 class="h3 mb-3 fw-normal">Sign up</h1>
	
		<div class="form-floating">
			<input bind:value="{username}" class="form-control" placeholder="Username">
			<label>Username</label>
		</div>

		<div class="form-floating">
			<input bind:value="{firstName}" class="form-control" placeholder="First Name">
			<label>First Name</label>
		</div>

		<div class="form-floating">
			<input bind:value="{lastName}" class="form-control" placeholder="Last Name">
			<label>Last Name</label>
		</div>

		<div class="form-floating">
			<input bind:value="{email}" type="email" class="form-control" placeholder="name@example.com">
			<label>Email address</label>
		</div>

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
		color:#212529;
		border-color: #ef5f55;
	}
	h1 {
		padding: 15px;
		font-size: 50px;
	}
</style>
