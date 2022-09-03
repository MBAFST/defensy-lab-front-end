<script lang="ts">
    import { onMount } from "svelte";
    import axios from "axios";
    import { authenticated } from '../store/auth';
    import { link, location, push } from "svelte-spa-router";
    
    
    const document = {};
    const resumeCheckBoxes = ["☐", "☐", "☐", "☐", "☐", "☐"];
    const notificationCheckBoxes = ["☐", "☐", "☐", "☐", "☐", "☐", "☐", "☐", "☐"];
    const followUpCheckBoxes = ["☐", "☐", "☐", "☐"];

    onMount(async () => {
        const { data } = await axios.get("incident/" + $location.split("/")[4]);
        resumeCheckBoxes[data["document"]["detection-type"]] = "☑";
        notificationCheckBoxes[data["document"]["notifier"]] = "☑";
        followUpCheckBoxes[data["document"]["reviewer"]] = "☑";
        // action
        document["identification-measures"] = data["document"]["identification-measures"];
        document["restraint-measures"] = data["document"]["restraint-measures"]; 
        document["evidence-collected"] = data["document"]["evidence-collected"];
        document["eradication-measures"] = data["document"]["eradication-measures"]; 
        document["recovery-measure"] = data["document"]["recovery-measure"];
        document["other-mitigation-measures"] = data["document"]["other-mitigation-measures"]; 
        // attachments
        document["image-1"] = data["document"]["image-1"];
        document["image-2"] = data["document"]["image-2"];
        document["image-3"] = data["document"]["image-3"];
        document["image-4"] = data["document"]["image-4"];
        document["image-5"] = data["document"]["image-5"];
        // evaluation
        document["members-reaction"] = data["document"]["members-reaction"];
        document["documenting-procedures"] = data["document"]["documenting-procedures"];
        document["needed-information"] = data["document"]["needed-information"];
        document["actions-could-prevented-recovery"] = data["document"]["actions-could-prevented-recovery"];
        document["members-must-do"] = data["document"]["members-must-do"];
        document["correct-actions"] = data["document"]["correct-actions"];
        document["additional-resources-needed"] = data["document"]["additional-resources-needed"];
        document["other-recommandations"] = data["document"]["other-recommandations"];
        // follow-up
        document["recommanded-actions"] = data["document"]["recommanded-actions"];
        document["rapporter"] = data["document"]["rapporter"];
        document["carred-out"] = data["document"]["carred-out"];
        // information
        document["first-name"] = data["document"]["first-name"];
        document["last-name"] = data["document"]["last-name"];
        document["contact"] = data["document"]["contact"];
        document["place"] = data["document"]["place"];
        document["date-of-notification"] = data["document"]["date-of-notification"];
        document["tier"] = data["document"]["tier"];
        document["date-of-detection"] = data["document"]["date-of-detection"];
        document["type-of-software"] = data["document"]["type-of-software"];
        // notification
        document["other"] = data["document"]["other"];
        // resume
        document["description"] = data["document"]["description"];
        document["members"] = data["document"]["members"];
        authenticated.set(true);
    });

    $: back = async () => {
        await push("/user/" + $location.split("/")[2]);

    }

    $: print = () => {
        window.print();
        return false;
    }

    let time:any = new Date().toLocaleString();

</script>

<main>
    <button class="btn" on:click={back}>Back</button>
    <button class="print" on:click={print}>print</button>
    <div class="container">

    
    <h2>Formulaire de réponse aux cyber-incidents</h2>
	<p class="client">Communication privilégiée et confidentielle entre DEFENSY LAB SOC et son Client ------------</p>
	<div style="margin: 1rem 5rem;">
		<h3 class="content">INFORMATION SUR L'IDENTIFICATION DE L'INCIDENT</h3>
		<div class="content">Date et heure de Notification: {document["date-of-notification"]}</div>
		<div class="content">Informations sur la personne qui a détecté l'incidents</div>
		<div><span class="data data-right content">Nom et Prénom: {document["last-name"] + " " + document["first-name"]}</span><span class="data data-left content">Date et heure de détection: {document["date-of-detection"]}</span></div>
		<div><span class="data data-right content">Tier: {document["tier"]}</span><span class="data data-left content">Lieu: {document["place"]}</span></div>
		<div><span class="data data-right content">GSM/Contact: {document["contact"]}</span><span class="data data-left content">Système ou application: {document["type-of-software"]}</span></div>
		<h3>RÉSUMÉ DE L'INCIDENT</h3>
		<div class="content type">
			Type of Incident Detected:
			<br>
			<span class="check-box-3">{resumeCheckBoxes[0]} Denial of Service</span>
            <span class="check-box-3">{resumeCheckBoxes[1]} Malicious Code</span>
            <span class="check-box-3">{resumeCheckBoxes[2]} Unauthorized Use</span>
			<br>
			<span class="check-box-3">{resumeCheckBoxes[3]} Unauthorized Access</span>
            <span class="check-box-3">{resumeCheckBoxes[4]} Unplanned Downtime</span>
            <span class="check-box-3">{resumeCheckBoxes[5]} Other</span>
		</div>
		<div class="content description">
			Description de l’Incident:
			<br>
            {document["description"]}
		</div>
		<div class="content description">
            Noms et Coordonnées des autres personnes impliquées:
            <br>
            {document["members"]}
        </div>
		<h3 class="content">NOTIFICATION D'INCIDENT - AUTRES</h3>
		<div class="content">
			<span class="check-box-3">{notificationCheckBoxes[0]} IS Leadership</span>
            <span class="check-box-3">{notificationCheckBoxes[1]} System or Application Owner</span>
            <span class="check-box-3">{notificationCheckBoxes[2]} System or Application Vendor</span>
			<br>
			<span class="check-box-3">{notificationCheckBoxes[3]} Security Incident Response Team</span>
            <span class="check-box-3">{notificationCheckBoxes[4]} Public Affairs</span>
            <span class="check-box-3">{notificationCheckBoxes[5]} Legal Counsel</span>
			<br>
			<span class="check-box-3">{notificationCheckBoxes[6]} Administration</span>
            <span class="check-box-3">{notificationCheckBoxes[7]} Human Resources</span>
            <span class="check-box-3">{notificationCheckBoxes[8]} Other:</span>
		</div>
		<h3 class="content">ACTIONS</h3>
		<div class="content description">
            Mesures d'identification (Incident vérifié, analysé, options évaluées):
            <br>
            {document["identification-measures"]}
        </div>
		<div class="content description">
            Mesures de contention:
            <br>
            {document["restraint-measures"]}
        </div>
		<div class="content description">
            Preuves recueillies ( Logs des systèmes, etc.):
            <br>
            {document["evidence-collected"]}
        </div>
		<div class="content description">
            Mesures d'éradication:
            <br>
            {document["eradication-measures"]}
        </div>
		<div class="content description">
            Mesures de rétablissement:
            <br>
            {document["recovery-measure"]}
        </div>
		<div class="content description">
            Autres mesures de mitigation:
            <br>
            {document["other-mitigation-measures"]}
        </div>
	</div>
	<h2>Formulaire de réponse aux cyber-incidents</h2>
	<p class="client">Communication privilégiée et confidentielle entre DEFENSY LAB SOC et son Client ------------</p>
	<div style="margin: 1rem 5rem;">
		<h3 class="content">EVALUATION</h3>
		<div class="content description">
            Quelle a été la réaction des membres de l’équipe ?
            <br>
            {document["members-reaction"]}
        </div>
		<div class="content description">
            Les procédures documentées ont-elles été suivies ? Étaient-elles adéquates ?
            <br>
            {document["documenting-procedures"]}
        </div>
		<div class="content description">
            Quelles informations étaient nécessaires?
            <br>
            {document["needed-information"]}
        </div>
		<div class="content description">
            Des mesures ou des actions ont-elles été prises qui auraient pu empêcher la reprise ?
            <br>
            {document["actions-could-prevented-recovery"]}
        </div>
		<div class="content description">
            Que pourraient faire différemment les membres de l'équipe la prochaine fois qu'un incident se produira ?
            <br>
            {document["members-must-do"]}
        </div>
		<div class="content description">
            Quelles actions correctives peuvent empêcher des incidents similaires à l'avenir ?
            <br>
            {document["correct-actions"]}
        </div>
		<div class="content description">
            Quelles ressources supplémentaires sont nécessaires pour détecter, analyser et atténuer les futurs incidents ?
            <br>
            {document["additional-resources-needed"]}
        </div>
		<div class="content description">
            Autres conclusions ou recommandations:
            <br>
            {document["other-recommandations"]}
        </div>
		<h3 class="content">FOLLOW-UP</h3>
		<div class="content">Reviewed By:
			<br>
			<span class="check-box-2">{followUpCheckBoxes[0]} SOC Manager</span>
            <span class="check-box-2">{followUpCheckBoxes[1]} CEO</span>
			<br>
			<span class="check-box-2">{followUpCheckBoxes[2]} RSSI</span>
            <span class="check-box-2">{followUpCheckBoxes[3]} Other</span>
		</div>
		<div class="content description">
            Actions recommandées réalisées:<br>
            {document["recommanded-actions"]}
        </div>
		<div class="content description">
            Rapport initial réalisé par:
            <br>
            {document["rapporter"]}
        </div>
		<div class="content description">
            Suivi effectué par:
            <br>
            {document["carred-out"]}
        </div>
	</div>
	<p class="left">
		Ce formulaire a été conçu comme un outil de travail pour les activités d'évaluation et d'amélioration ; il est destiné à un usage interne uniquement.
		<br>
		DEFENSY LAB/{time}– Rev-1.0.0
	</p>
</div>
</main>

<style>
    .container {
        margin: 50px auto;
        border: 0;
        
    }
    .btn {
	    margin-left: 4rem;
    	background-color: transparent;
		color:#132a6a;
		border-color: #ef5f55;
        margin-bottom: 20px;
        position: absolute;
        top: 50px;
        right: 470px;
        width: 80px;
	}
	
    .btn:hover{
        background-color: #ef5f55;
        color:white;
        border-color: #132a6a;
    }
    
    h2, h3, div span {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: Arial, Helvetica, sans-serif;
		font-size: 1.25rem;
	}

	h2 {
		padding: 1.5rem;
		background-color: #ef5f55;
		color: white;
		text-align: center;
		font-size: 4rem;
	}

	h3 {
		background-color: #132a69;
		color: white;
		text-align: center;
		font-size: 2rem;
	}

	.client {
		margin: 1rem;
		text-align: center;
	}

	.left {
		margin-bottom: 1rem;
		padding-left: 5rem;
		font-size: 0.75rem;
		text-align: left;
	}

	div {
		border: 1px solid black;
	}

	.content {
		padding: 0.25rem;
	}

	.data {
		display: inline-block;
		width: 50%;
	}

	.data-left {
		border-left: 1px solid black;
	}

	.data-right {
		border-right: 1px solid black;
	}

	.check-box-2 {
		display: inline-block;
		width: 49.5%;
		padding: 0.25rem 3rem;
	}

	.check-box-3 {
		display: inline-block;
		width: 33%;
		padding: 0.25rem 3rem;
	}

	.description {
		height: auto;
	}
    .print {
        margin-left: 4rem;
    	background-color: transparent;
		color:#132a6a;
		border: 1px solid #ef5f55;
        margin-bottom: 20px;
        position: absolute;
        top: 50px;
        right: 370px;
        width: 80px;
        outline: 0;
        border-radius: 5px;
        padding: 6px;
        cursor: alias;
    }
    .print:hover{
        background-color: #ef5f55;
        color:white;
        border-color: #132a6a;
    }
    span {
    font-size: 17px !important;
}
</style>
