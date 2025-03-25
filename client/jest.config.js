module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom', // Required for React testing
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Points to setup file
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: '<rootDir>/tsconfig.json'
        }]
    },
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{ts,tsx}',
        '<rootDir>/src/**/*.{spec,test}.{ts,tsx}'
    ],
    testEnvironmentOptions: {
        customExportConditions: [''],
    },

};