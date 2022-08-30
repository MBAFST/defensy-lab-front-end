<script lang="ts">
	import axios from "axios";
	import { push } from "svelte-spa-router";
import { prevent_default } from "svelte/internal";

	let username: String = "";
	let firstName: String = "";
	let lastName: String = "";
	let email: String = "";
	let password: String = "";
	let passwordConfirm: String = "";

	async function handleSubmission() {
    hasBeenClicked = true; 
    if (isValidUName && isValidFName&& isValidLName && isValidEmail && isValidPassword && isValidCPassword ) {
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
	};


	let hasBeenClicked = false;

	function validateEmail(email:String) {

    var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 

    return emailRegEx.test(String(email).toLowerCase());
  }
  $: isValidUName = username.length > 0;
  $: isValidFName = firstName.length > 0;
  $: isValidLName = lastName.length > 0;
  $: isValidEmail = validateEmail(email);
  $: isValidPassword = password.length > 8;
  $: isValidCPassword = passwordConfirm == password;

</script>

<main class="form-signin w-100 m-auto">

		<h1 class="h3 mb-3 fw-normal">Sign up</h1>
	
		<div class="form-floating ">
			<input bind:value="{username}" class="form-control" placeholder="Username" >
			<label>Username</label>
			{#if hasBeenClicked && !isValidUName} 
			<p class="validation-error">Please enter a Valid username</p>
			{/if}
		</div>

		<div class="form-floating ">
			<input bind:value="{firstName}" class="form-control" placeholder="First Name" >
			<label>First Name</label>
			{#if hasBeenClicked && !isValidFName} 
			<p class="validation-error">Please enter a Valid Name</p>
			{/if}
		</div>

		<div class="form-floating ">
			<input bind:value="{lastName}" class="form-control" placeholder="Last Name" >
			<label>Last Name</label>
			{#if hasBeenClicked && !isValidLName} 
			<p class="validation-error">Please enter a Valid Name</p>
			{/if}
		</div>

		<div class="form-floating ">
			<input bind:value="{email}" type="email" class="form-control" placeholder="name@example.com" >
			<label>Email address</label>
			{#if hasBeenClicked && !isValidEmail} 
			<p class="validation-error">Invalid email</p>
			{/if}
		</div>

		<div class="form-floating ">
			<input bind:value="{password}" type="password" class="form-control" placeholder="Password" >
			<label>Password</label>
			{#if hasBeenClicked && !isValidPassword} 
			<p class="validation-error">Please enter a longer password</p>
			{/if}
			
		</div>

		<div class="form-floating ">
			<input bind:value="{passwordConfirm}" type="password" class="form-control" placeholder="Password Confirm" >
			<label>Password Confirm</label>
			{#if hasBeenClicked && !isValidCPassword} 
			<p class="validation-error">Passwords does not match!</p>
			{/if}
		</div>

		<button on:click={handleSubmission} class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
	
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
  .validation-error {
    color: rgba(255, 0, 0, 0.425);
    margin-top: 5px;
  }
</style>

