<script>
	import { createAction } from "../factory/action.factory";
	import { createAttachments } from "../factory/attachments.factory";
	import { createEvaluation } from "../factory/evaluation.factory";
	import { createFollowUp } from "../factory/follow-up.factory";
	import { createInformation } from "../factory/information.factory";
	import { createNotification } from "../factory/notification.factory";
	import { createResume } from "../factory/resume.factory";
	import { link, push, location } from "svelte-spa-router";
	import axios from "axios";
        
	export let active_step;

	const action = createAction();
	const attachments = createAttachments();
	const evaluation = createEvaluation();
	const followUp = createFollowUp();
	const information = createInformation();
	const notification = createNotification();
	const resume = createResume();

	const detectionType = [
		{ id: 0, text: "Denial of Service" },
		{ id: 1, text: "Malicious Code" },
		{ id: 2, text: "Unauthorised Use" },
		{ id: 3, text: "Unauthorised Access" },
		{ id: 4, text: "Unplanned Dowtime" },
		{ id: 5, text: "Other:" }
	];

	const notifiers = [
		{ id: 0, text: "IS Leadership" },
		{ id: 1, text: "System or Application Owner" },
		{ id: 2, text: "System or Application Vendor" },
		{ id: 3, text: "Security Incident Response Team" },
		{ id: 4, text: "Public Affairs" },
		{ id: 5, text: "Legal Counsel" },
		{ id: 6, text: "Administration" },
		{ id: 7, text: "Human Resources" },
		{ id: 8, text: "Other:" }
	];

	const reviewers = [
		{ id: 0, text: "SOC Manager" },
		{ id: 1, text: "CEO" },
		{ id: 2, text: "RSSI" },
		{ id: 3, text: "Other:" }
	];

	async function handleSubmission() {
		const args = $location.split("/");
		const document = await axios.post(`user/${args[2]}/incident`, {
			// action
			"identification-measures": action.identificationmMeasures,
			"restraint-measures": action.restraintMeasures,
			"evidence-collected": action.evidenceCollected,
			"eradication-measures": action.eradicationMeasures,
			"recovery-measure": action.recoveryMeasure,
			"other-mitigation-measures": action.otherMitigationMeasures,
			// attachments
			"image-1": attachments.image1,
			"image-2": attachments.image2,
			"image-3": attachments.image3,
			"image-4": attachments.image4,
			"image-5": attachments.image5,
			// evaluation
			"members-reaction": evaluation.membersReaction,
			"documenting-procedures": evaluation.documentingProcedures,
			"needed-information": evaluation.neededInformation,
			"actions-could-prevented-recovery": evaluation.actionsCouldPreventedRecovery,
			"members-must-do": evaluation.membersMustDo,
			"correct-actions": evaluation.correctActions,
			"additional-resources-needed": evaluation.additionalResourcesNeeded,
			"other-recommandations": evaluation.otherRecommandations,
			// follow-up
			"reviewer": followUp.reviewer,
			"recommanded-actions": followUp.recommandedActions,
			"rapporter": followUp.rapporter,
			"carred-out": followUp.carredOut,
			// information
			"date-of-notification": (new Date()).toISOString().slice(0,10),
			"tier": information.tier,
			"date-of-detection": information.dateOfDetection,
			"type-of-software": information.typeOfSoftware,
			// notification
			"notifier": notification.notifier,
			"other": notification.other,
			// resume
			"detection-type": resume.detectionType,
			"description": resume.description,
			"members": resume.members,
		});

		console.log(document);
		await push(`/user/${args[2]}`);
	}
</script>

<div class="form-container" >
	{#if active_step == 'Notification'}
		<h1 class="tit">&nbsp; Notificateur de L incident</h1>
		<div class="tog2">
			<input type="number" required placeholder="Tier" name="tier" bind:value="{information.tier}">
			<input type="text" required placeholder="Lieu" name="lieu" bind:value="{information.place}">
		</div>
		<div class="tog3">
			<input type="text" required placeholder="GSM/Contact" name="GSM" bind:value="{information.contact}">
			<input type="text" required placeholder="Systeme ou Application" name="sys" bind:value="{information.typeOfSoftware}">
		</div>
		<input type="date" required name="date" bind:value="{information.dateOfDetection}">
	{:else if active_step == 'Type'}
		<h1 class="tit">&nbsp; Resume de l'incident</h1>
		<select bind:value={resume.detectionType}>
			{#each detectionType as detected}
				<option value={detected.id}>
					{detected.text}
				</option>
			{/each}
		</select>
		<br>
		<textarea id="desc-incid" name="descr" placeholder="Description Sur L'incident" required bind:value={resume.description}></textarea>
		<textarea id="desc-incid" name="descr" placeholder="Noms et Coordonnées des autres personnes impliquées:" required bind:value={resume.members}></textarea>
	{:else if active_step == 'Notificateur'}
		<h1 class="title">Notificateur</h1>
		<select bind:value={notification.notifier}>
			{#each notifiers as notifier}
				<option value={notifier.id}>
					{notifier.text}
				</option>
			{/each}
		</select>
		<br>
		{#if notification.notifier === 8}
			<textarea id="desc-incid" name="descr" placeholder="Other:" required bind:value={notification.other}></textarea>
		{/if}
	{:else if active_step == 'Actions'}
		<h1 class="tit">&nbsp; Actions</h1>
		<div>
			<textarea name="mes-1" placeholder="identification-measures" bind:value={action.identificationmMeasures} required></textarea>
			<textarea name="mes-2" placeholder="restraint-measures" bind:value={action.restraintMeasures} required></textarea>
		</div>
		<div>
			<textarea name="mes-3" placeholder="evidence-collected" bind:value={action.evidenceCollected} required></textarea>
			<textarea name="mes-4" placeholder="recovery-measure" bind:value={action.recoveryMeasure} required></textarea>
		</div>
		<div>
			<textarea name="mes-5" placeholder="Autres mesures de mitigation" bind:value="{action.otherMitigationMeasures}" required ></textarea>
		</div>
    {:else if active_step == 'Evaluation'}
		<h1 class="tit">&nbsp; Evaluation</h1>
		<div>
			<textarea name="ques-1" placeholder="Quelle a été la réaction des membres de l’équipe ? " bind:value={evaluation.membersReaction} required></textarea>
		</div>
		<div>
			<textarea name="ques-3" placeholder="Les procdures documentées ont-elles été suivies?Etaient-elles adéquates?" bind:value={evaluation.documentingProcedures} required></textarea>
			<textarea name="ques-4" placeholder="Quelles informations étaient nécessaures?" class="input-4" bind:value={evaluation.neededInformation}
			required></textarea>
		</div>
		<div>
			<textarea name="ques-5"
				placeholder="Des mesures ou des actions ont-elles été repris qui auraient pu empecher la reprise"
				bind:value={evaluation.actionsCouldPreventedRecovery} required></textarea>
			<textarea name="ques-6"
				placeholder="Que pourrait faire différement les membres de l'équipe la prochaine fois qu'un incident se produira"
				bind:value={evaluation.otherRecommandations} required></textarea>
		</div>	
		<div>	
				<textarea name="ques-7"
					placeholder="Quelles actions correctives peuvent empecher des incidents similaires a l'avenir ?" bind:value={evaluation.correctActions}
					required></textarea>
				<textarea name="ques-8"
					placeholder="Quelles ressources supplémentaires sont nécessaires pour détecter, analyser et atténuer les futurs incidents ?"
					bind:value={evaluation.additionalResourcesNeeded} required></textarea>
		</div>
    {:else if active_step == 'Follow Up'}
		<h1 class="tit">&nbsp; Follow Up</h1>
		<select bind:value={followUp.reviewer}>
			{#each reviewers as reviewer}
				<option value={reviewer.id}>
					{reviewer.text}
				</option>
			{/each}
		</select>
		<div class="tog3">
			<input name="realis" type="text" required placeholder="Rapport initial réalisé par" bind:value={followUp.rapporter}>
		</div>
		<textarea name="action" placeholder="Actions recommandées réalisées" id="follow-area" bind:value={followUp.recommandedActions}
			class="input-area-5 " cols="30" rows="10"></textarea>
	{:else if active_step == 'Rapport'}
		<div class="message">
			<h2>Votre rapport est pret a envoyee</h2> 
			<button class="submit" type="submit" on:click={handleSubmission}>Finish</button>
		</div>
	{/if}
	</div>

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
	
	input[type=date]{
		width: 690px;
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