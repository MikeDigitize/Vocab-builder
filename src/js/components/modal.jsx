import React, { PropTypes, Component } from 'react';
import { onEditWord, onListen, onSave, toggleModal, onModalClose } from '../utils/modal';
import styles from '../../scss/modal';

let preventSpeech = false;

export default class Modal extends Component {
	constructor(props) {
		super(props);
	}
	componentDidUpdate() {
		toggleModal(this.refs, this.props);
	}
	onEditWord() {
		onEditWord(this.refs, this.props);		
	}
	onListen() {
		onListen(this.props);		
	}
	onModalClose() {
		onModalClose(this.refs, this.props, this.onEditWord.bind(this));
	}
	onSave() {
		onSave(this.refs, this.props);
	}
	render() {
		let { onModalClose, saveItem } = this.props;
		return (
		  <div className={ `${styles.modalHolder}` }>
				<div className="vocabModal" ref="modal">	 	
					<div className="modal-close" onClick={ this.onModalClose.bind(this) }></div>	
					<div className="row">
						<div className="col-sm-12">
							<h2> 
								<span ref="currentWord">{ saveItem }</span>
								<p
									data-state="edit"
									ref="edit"
									onClick={ this.onEditWord.bind(this) } 
									className={ `${styles.editWord}` }>
									edit
								</p>
							</h2>
							<span className="listen" onClick={ this.onListen.bind(this) }>Listen</span>
						</div>
						<div className="col-sm-8 offset-sm-2">
							<div className="form-group">
								<label htmlFor="definition">Add a definition</label>
								<textarea 
									className="form-control" 
									id="definition" 
									ref="definition" 
									rows="3"
									aria-describedby="definitionHelp" 
									placeholder={ `Define ${saveItem}...` }>
								</textarea>
								<small 
										id="definitionHelp" 
										className="form-text text-muted">
										Add a definition to store alongside your word.
									</small> 
							</div>
						</div>
						<div className="col-sm-8 offset-sm-2">
							<div className="form-group">
								<label htmlFor="synonyms">Synonyms</label>
									<input 
										type="text" 
										className="form-control" 
										id="synonyms"
										ref="synonyms" 
    								aria-describedby="synonymHelp" 
    								placeholder={ `Synonyms for ${saveItem}...` }/>
									<small 
										id="synonymHelp" 
										className="form-text text-muted">
										Synonyms are optional! Use commas to separate words or phrases.
									</small> 
							</div>
							<button 
								type="submit" 
								className="btn btn-primary"
								onClick={ this.onSave.bind(this) }>
								Save { saveItem }
							</button>
						</div>
					</div>
				</div>	
				<div 
					className="modalOverlay"
					ref="overlay"
					onClick={ this.onModalClose.bind(this) } >						
				</div>	 
			</div>
		);
	}
}

Modal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
	onItemSave: PropTypes.func.isRequired,
	isModalVisible: PropTypes.bool.isRequired,
  saveItem: PropTypes.string.isRequired
};