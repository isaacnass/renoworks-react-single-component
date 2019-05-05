import React from 'react'
import ReactDOM from 'react-dom'

export default class CanvasHouseViewer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
		this.canvas = null
		this._viewer = null
	}

	componentDidMount() {
		this.initCanvas()
	}

	initCanvas() {
		const { Renoworks } = window
		const canvas = this.canvas

		if (!canvas) {
			return console.error('Canvas ref was not found')
		} else if (!Renoworks) {
			return console.error('Renoworks was not found in the window')
		}

		canvas.width = canvas.height = 600
		canvas.height = 400
		this._viewer = Renoworks.init(canvas, { onPick: this._onUserPick })
		Renoworks.spin(this._viewer, 0.003)
		Renoworks.display(this._viewer, '12d2d0b1-216f-429c-b5d1-2add05e076fe')
	}

	_onUserPick = () => {
		const { Renoworks } = window
		// this.props.onHousePick(selected_name)
		this.props.onHousePick(Renoworks.selection(this._viewer))
		// console.log(Renoworks.selection(this._viewer))
		console.log(
			Renoworks.selection(this._viewer)
				.map(meta => meta.name)
				.join(',')
		)
	}

	render() {
		return (
			<canvas
				style={{ width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,.2)' }}
				ref={r => (this.canvas = r)}
				touch-action="none"
			/>
		)
	}
}

const domContainer = document.getElementById('renoworks2')
ReactDOM.render(<CanvasHouseViewer />, domContainer)
