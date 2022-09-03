let firstName: string = "";
let lastName: string = "";
let contact: string = "";
let place: string = "";
let dateOffNotification: Date = null;
let tier: string = "";
let dateOfDetection: Date = null;
let typeOfSoftware: string = "";

export const createInformation = () => {
    return {
        firstName,
        lastName,
        contact,
        place,
        dateOffNotification,
        tier,
        dateOfDetection,
        typeOfSoftware
    }
}
