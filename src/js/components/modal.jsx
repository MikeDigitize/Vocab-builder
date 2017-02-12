import React, { PropTypes } from 'react';
import styles from '../../scss/modal';

const Modal = () => (
  <div className={ `${styles.modalHolder}` }>
		<div className="vocabModal">	 	
			<div className="modal-close"></div>	
			<div className="row">
				<div className="col-sm-12">
					<h2> 
						<span>Your word</span>
						<a href="" 
							data-state="edit" 
							className={ `${styles.editWord}` }>
							edit
						</a>
					</h2>
					<span className="listen">Listen</span>
				</div>
				<div className="col-sm-8 offset-sm-2">
					<div className="form-group">
						<label for="definition">Add a definition</label>
						<textarea 
							className="form-control" 
							id="definition" 
							rows="3"
							aria-describedby="definitionHelp" 
							placeholder={ `Define your word...` }>
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
						<label for="synonyms">Synonyms</label>
							<input 
								type="text" 
								className="form-control" 
								id="synonyms"
								aria-describedby="synonymHelp" 
								placeholder={ `Synonyms for your word...` }/>
							<small 
								id="synonymHelp" 
								className="form-text text-muted">
								Synonyms are optional! Use commas to separate words or phrases.
							</small> 
					</div>
					<button 
						type="submit" 
						className="btn btn-primary">
						Save
					</button>
				</div>
			</div>
		</div>	
		<div className="modalOverlay">					
		</div>	 
	</div>
);

// Modal.propTypes = {
//   onModalClose: PropTypes.func.isRequired,
//	 onListen: PropTypes.func.isRequired,
//	 onEditWord: PropTypes.func.isRequired,
//   onInputChange: PropTypes.func.isRequired,
//   currentWord: PropTypes.string.isRequired,
// };

export default Modal;