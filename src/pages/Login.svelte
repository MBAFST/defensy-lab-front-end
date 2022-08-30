<script lang="ts">
	import axios from "axios";
	import { push, link } from "svelte-spa-router";

	let email: String = "";
	let password: String = "";

	$: submit = async () => {
		var {data} = await axios.post("login", {
			"email": email,
			"password": password,
		}, { withCredentials: true });

        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

		const user = await (await axios.get("user")).data;
		const { status } = await axios.get("user");

		if (status === 200) {
			if (user["is-admin"] !== "admin")
				await push("/user/" + user["id"]);
			else
				await push("/admin");
		}
		else {
			await push("/");
		}
	};
</script>

<main class="form-signin w-100 m-auto">
	<form on:submit|preventDefault="{submit}">
		<h1 class="h3 mb-3 fw-normal">Login</h1>
	
		<div class="form-floating">
			<input bind:value="{email}" type="email" class="form-control" placeholder="name@example.com">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label>Email address</label>
		</div>
		<div class="form-floating">
			<input bind:value="{password}" type="password" class="form-control" placeholder="Password">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label>Password</label>
		</div>

		<div class="mb-3">
			<a class="forgot"  href="/forgot" use:link>Forgot your password</a>
		</div>

		<button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
	</form>
</main>
<style>
	.form-floating .form-control{
		margin-bottom: 20px;
		width: 400px;
		border: 0;
		border-bottom: 1px solid #212529;
		border-radius: 0;
	}
	.forgot{
		color: #112866;
		padding: 10px;
	}

	h1 {
		padding: 15px;
		font-size: 50px;
		color: #132a6a;
	}
	.btn {
		background-color: transparent;
		color:#132a6a;
		border-color: #ef5f55;
	}
</style>