              {isSubmitted ? (
                <div style={{
                  background: 'rgba(76, 175, 80, 0.2)',
                  borderRadius: '1.5rem',
                  padding: '1.5rem',
                  textAlign: 'center'
                }}>
                  <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>🎉</div>
                  <h4 style={{margin: 0, marginBottom: '0.5rem', color: 'white'}}>Perfetto!</h4>
                  <p style={{margin: 0, opacity: 0.9}}>Sei stato aggiunto alla waiting list</p>
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} style={{
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}>
                  <input
                    type="email"
                    placeholder="La tua email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      flex: '1',
                      minWidth: '250px',
                      padding: '0.9rem 1.3rem',
                      borderRadius: '1.5rem',
                      border: error ? '2px solid #ff5252' : 'none',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      ...buttonStyle,
                      fontSize: '1rem',
                      padding: '0.9rem 1.8rem',
                      whiteSpace: 'nowrap',
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isSubmitting ? '⏳ Invio...' : '🎯 Riservami il posto'}
                  </button>
                </form>
              )}
              {error && (
                <p style={{
                  color: '#ff5252',
                  fontSize: '0.9rem',
                  marginTop: '0.5rem',
                  textAlign: 'center'
                }}>
                  {error}
                </p>
              )}
