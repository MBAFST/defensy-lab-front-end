<script>

import { link, push } from "svelte-spa-router";
        
	export let active_step;

	let formData = {
		name: '',
		surname: '',
		email: '',
		password: '',
		address: '',
		city: '',
		country: '',
		postcode: '',
		account_name: '',
		card_no: ''
	}
	$: handleSubmit  =  async() => {
		await push("/user/id");
	}; 
	const action = {
		identificationmMeasures: "",
		restraintMeasures:"",
		evidenceCollected: "",
		eradicationMeasures: "",
		recoveryMeasure: "",
		other-mitigation-measures": ""
	}
	const evaluation = {
		members-reaction": "",
		documenting-procedures": "",
		needed-information": "",
		actions-could-prevented-recovery": "",
		members-must-do": "",
		correct-actions":"",
		additional-resources-needed": "",
		other-recommandations": ""
	}
	const followUp = {
		reviewer": 0,
		recommanded-actions": "",
		rapporter":"",
		carred-out": ""

	}
	const information = {
		date-of-notification": null,
		tier": "",
		date-of-detection": null,
		type-of-software": ""
	}
	const resume = {
		detection-type": "",
		description": "",
		members": ""
}	const notification = {
		notifier":0,
		other": ""
	}

	

</script>

<form class="form-container" on:submit={handleSubmit}>
	{#if active_step == 'Notification'}
	<h1 class="tit">&nbsp; Notificateur de L incident</h1>
	<div class="tog1">
		<input type="text" required placeholder="Votre Nom" name="nom" >
		<input type="text" required placeholder="Votre Prenom" name="prenom">
	</div>
	<div class="tog2">
		<input type="text" required placeholder="Tier" name="tier" value="{['last-name']}">
		<input type="text" required placeholder="Lieu" name="lieu">
	</div>
	<div class="tog3">
		<input type="number" required placeholder="GSM/Contact" name="GSM">
		<input type="text" required placeholder="Systeme ou Application" name="sys" >
	</div>
	<input type="datetime-local" required name="date">

	{:else if active_step == 'Type'}
		<h1 class="tit">&nbsp; Resume De L'incident</h1>
		<select name="liste-incid" id="list-incid">
			<option value="1">Choisr l'incident</option>
			<option value="hiden-form">Denial Of Service</option>
			<option value="3">Malicious Code</option>
			<option value="4">Unauthorised Use</option>
			<option value="5">Unauthorised Access</option>
			<option value="6">Unplanned Dowtime</option>
			<option value="7">Other</option>
		</select><br>
		<textarea id="desc-incid" name="descr" placeholder="Description Sur L'incident" required ></textarea>
	{:else if active_step == 'Notificateur'}
	<h1 class="title">Notificateur</h1>
	<select name="liste-mod" id="list-incid">
		<option value="a">Notificateur D'incident</option>
		<option value="b">IS Leadership</option>
		<option value="c">Security Incident Response Team</option>
		<option value="d">Administration</option>
		<option value="e">Systeme Or Application Owner</option>
		<option value="f">Public Affairs</option>
		<option value="g">Human Ressources</option>
		<option value="h">System Or Application Vender</option>
		<option value="i">Legal Counsel</option>
		<option value="j">Other</option>
	</select><br>
	<textarea id="desc-incid" name="descr" placeholder="Description Sur L'incident" required ></textarea>


    {:else if active_step == 'Actions'}
	<h1 class="tit">&nbsp; Actions</h1>
	<div>
		<textarea name="mes-1" placeholder="identification-measures" bind:value="{action["identification-measures"]}" required></textarea>
		<textarea name="mes-2" placeholder="restraint-measures" bind:value="{action["restraint-measures"]}" required></textarea>
	</div>
	<div>
		<textarea name="mes-3" placeholder="evidence-collected" bind:value="{action["evidence-collected"]}" required></textarea>
		<textarea name="mes-4" placeholder="recovery-measure" bind:value="{action["recovery-measure"]}"  required></textarea>
	</div>
	<div>
		<textarea name="mes-5" placeholder="Autres mesures de mitigation" bind:value="{action["other-mitigation-measures"]}" required ></textarea>
	</div>


    {:else if active_step == 'Evaluation'}
	<h1 class="tit">&nbsp; Evaluation</h1>
	<div>
		<textarea name="ques-1" placeholder="Quelle a été la réaction des membres de l’équipe ? " bind:value="{evaluation["members-reaction"]}" required></textarea>
	</div>
	<div>
		<textarea name="ques-3" placeholder="Les procdures documentées ont-elles été suivies?Etaient-elles adéquates?" bind:value="{evaluation["needed-information"]}" required></textarea>
		<textarea name="ques-4" placeholder="Quelles informations étaient nécessaures?" class="input-4" bind:value="{evaluation["needed-information"]}"
		required></textarea>
	</div>	
	<div>
		<textarea name="ques-5"
			placeholder="Des mesures ou des actions ont-elles été repris qui auraient pu empecher la reprise"
			bind:value="{evaluation["actions-could-prevented-recovery"]}"  required></textarea>
		<textarea name="ques-6"
			placeholder="Que pourrait faire différement les membres de l'équipe la prochaine fois qu'un incident se produira"
			bind:value="{evaluation["other-recommandations"]}" required></textarea>
	</div>	
	<div>	
			<textarea name="ques-7"
				placeholder="Quelles actions correctives peuvent empecher des incidents similaires a l'avenir ?" bind:value="{evaluation["correct-actions"]}"
				required></textarea>
			<textarea name="ques-8"
				placeholder="Quelles ressources supplémentaires sont nécessaires pour détecter, analyser et atténuer les futurs incidents ?"
				bind:value="{evaluation["additional-resources-needed"]}" required></textarea>
	</div>			
	

    {:else if active_step == 'Follow Up'}
	<h1 class="tit">&nbsp; Follow Up</h1>
	<select name="follow" class="frth-select"id="follow">
		<option value="E">Revue par</option>
		<option value="A">SOC Manager</option>
		<option value="B">RSSI</option>
		<option value="C">CEO</option>
		<option value="D">Autres</option>
	</select>
	<div class="tog3">
		<input name="realis" type="text" required placeholder="Rapport initial réalisé par" bind:value="{followUp["rapporter"]}">
		<input name="suiv" type="text" required placeholder="Suivi effectué par" bind:value="{}" >
	</div>
	<textarea name="action" placeholder="Actions recommandées réalisées" id="follow-area" bind:value="{followUp["recommanded-actions"]}"
		class="input-area-5 " cols="30" rows="10"></textarea>

	{:else if active_step == 'Rapport'}
		<div class="message">
			<h2>Votre rapport est pret a envoyee</h2> 
			<a href="/user/id" use:link ><button class="submit">Finish </button></a>
		</div>
	{/if}
</form>

<style>
	
	.form-container {
		background-color: rgb(255, 255, 255);
		border-radius: 10px;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
		padding: 50px 20px;
		text-align: center;
        color: black;
	}
	h1{
		margin-top: -50px;
	}
	select{
		background-color: #d6d6d6;
		border: none;
		width: 350px;
		height: 50px;
		color: black;
		margin-bottom: 7px;
	}
	select:focus{
		outline: none;
		transform: scale(0.98);
	}
	input{
		background-color: #d6d6d6;
		border: none;
		border-radius: 5px;
		height:25px ;
		width: 300px;
		padding: 10px 30px;
		margin: 7px;
		color: black;
		transition: border 0.25s;
	}
	input:focus{
		outline: none;
		transform: scale(0.98);
	}
	input[type=datetime-local]{
		width: 690px;
	}
	input[type=file]{
		position: relative;
		bottom: 50px;
		height: 50px;
	}
	textarea{
		width: 350px;
		height: 65px;
		margin: 7px;
		background-color: #d6d6d6;
		border-radius: 5px;
		border: none;
		color: black;
	}
	textarea:focus{
		transform: scale(0.98);
		outline: none;
	}
	#last-area{
		width: 720px;
	}
	#follow{
		width: 735px;
		margin-bottom: 7px;
	}
	#follow-area{
		width: 735px;
		margin-top: 7px;

	}
	.submit{
		background-color:#6b6b6b;
		color: rgb(0, 0, 0);
		padding: 0.5rem 0;
		margin-top: 0.5rem;
		display: inline-block;
		width:50%;
		border-radius: 0.25rem;
		cursor:pointer;
		transition: background-color 0.8s;
		transition: border 0.7s;
	}
	.submit:focus{
		transform: scale(0.98);
		outline: none;

	}
	.submit:hover {
		border:1px solid rgb(18, 33, 58);
		background-color:rgb(18, 33, 58) ;
		color: white;
	}
	.message{
		text-align: center;
	}
	.message h2{
		font-size: 35px;
	}
</style>