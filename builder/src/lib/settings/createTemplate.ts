export const setMinimalTemplate = () => {
    return `
        :root {
            --primary-color: #1abc9c;
            --secondary-color: #16a085;
            --background-color: #ffffff;
            --text-color: #2c3e50;
        }
    `
}

export const setModernTemplate = () => {
    return `
        :root {
            --primary-color: #3498db;
            --secondary-color: #2ecc71;
            --background-color: #f5f5f5;
            --text-color: #2c3e50;
        }
    `
}

export const setBoldTemplate = () => {
    return `
        :root {
            --primary-color: #e74c3c;
            --secondary-color: #f39c12;
            --background-color: #ecf0f1;
            --text-color: #34495e;
        }
    `
}

export const setProfessionalTemplate = () => {
    return `
        :root {
            --primary-color: #2980b9;
            --secondary-color: #8e44ad ;
            --background-color: #f8f9fa;
            --text-color: #2d3436;
        }
    `
}

export const setCustomTemplate = (options: any) => {
    return `
        :root {
            --primary-color: ${options.primaryColor};
            --secondary-color: ${options.secondaryColor};
            --background-color: ${options.backgroundColor};
            --text-color: ${options.textColor};
        }
    `
}