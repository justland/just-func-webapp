// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
	if (onPerfEntry && onPerfEntry instanceof Function) {
		void import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
			getCLS(onPerfEntry)
			getFID(onPerfEntry)
			getFCP(onPerfEntry)
			getLCP(onPerfEntry)
			getTTFB(onPerfEntry)
		})
	}
}

export default reportWebVitals
