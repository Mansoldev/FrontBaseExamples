function getUserInfo() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: "Núria",
                email: "nuriamail@mail.com",
            });
        }, 4000);
    });
}

function getUserEnrolledCourses() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    title: "TypeScript Avanzado: Más allá de any",
                },
                {
                    title: "Buenas practicas con CSS: Selectores",
                },
                {
                    title: "Patrones de Diseño: Creacionales",
                },
            ]);
        }, 4000);
    });
}

function getBadUserEnrolledCourses() {
	return new Promise((_resolve, reject) => {
		setTimeout(() => {
			reject("Error fetching enrolled courses");
		}, 4000);
	});
}

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return formattedTime;
}