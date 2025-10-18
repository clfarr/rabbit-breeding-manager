import React, { useState, useMemo } from 'react';
import { Plus, Edit2, Trash2, Calendar } from 'lucide-react';

const RabbitBreedingApp = () => {
  const [activeTab, setActiveTab] = useState('rabbits');
  const [rabbits, setRabbits] = useState([]);
  const [breedings, setBreedings] = useState([]);
  const [litters, setLitters] = useState([]);
  const [events, setEvents] = useState([]);
  const [fairs, setFairs] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  const [rabbitForm, setRabbitForm] = useState({
    name: '', breed: '', gender: '', birthDate: '', notes: ''
  });
  const [breedingForm, setBreedingForm] = useState({
    damId: '', sireId: '', breedDate: '', expectedKindling: '', notes: ''
  });
  const [litterForm, setLitterForm] = useState({
    breedingId: '', birthDate: '', kitsAlive: '', kitsDead: '', notes: ''
  });
  const [eventForm, setEventForm] = useState({
    type: 'death', rabbitId: '', date: '', price: '', buyerNotes: '', notes: ''
  });
  const [fairForm, setFairForm] = useState({
    name: '', date: '', location: '', notes: ''
  });
  const [transactionForm, setTransactionForm] = useState({
    type: 'expense', category: '', amount: '', date: '', description: ''
  });

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    if (item) {
      if (type === 'rabbit') setRabbitForm(item);
      else if (type === 'breeding') setBreedingForm(item);
      else if (type === 'litter') setLitterForm(item);
      else if (type === 'event') setEventForm(item);
      else if (type === 'fair') setFairForm(item);
      else if (type === 'transaction') setTransactionForm(item);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setRabbitForm({ name: '', breed: '', gender: '', birthDate: '', notes: '' });
    setBreedingForm({ damId: '', sireId: '', breedDate: '', expectedKindling: '', notes: '' });
    setLitterForm({ breedingId: '', birthDate: '', kitsAlive: '', kitsDead: '', notes: '' });
    setEventForm({ type: 'death', rabbitId: '', date: '', price: '', buyerNotes: '', notes: '' });
    setFairForm({ name: '', date: '', location: '', notes: '' });
    setTransactionForm({ type: 'expense', category: '', amount: '', date: '', description: '' });
  };

  const saveRabbit = () => {
    if (editingItem) {
      setRabbits(rabbits.map(r => r.id === editingItem.id ? { ...rabbitForm, id: r.id } : r));
    } else {
      setRabbits([...rabbits, { ...rabbitForm, id: Date.now(), status: 'active' }]);
    }
    closeModal();
  };

  const saveBreeding = () => {
    if (editingItem) {
      setBreedings(breedings.map(b => b.id === editingItem.id ? { ...breedingForm, id: b.id } : b));
    } else {
      setBreedings([...breedings, { ...breedingForm, id: Date.now(), status: 'pending' }]);
    }
    closeModal();
  };

  const saveLitter = () => {
    if (editingItem) {
      setLitters(litters.map(l => l.id === editingItem.id ? { ...litterForm, id: l.id } : l));
    } else {
      setLitters([...litters, { ...litterForm, id: Date.now() }]);
      setBreedings(breedings.map(b => 
        b.id === parseInt(litterForm.breedingId) ? { ...b, status: 'completed' } : b
      ));
    }
    closeModal();
  };

  const saveEvent = () => {
    if (editingItem) {
      setEvents(events.map(e => e.id === editingItem.id ? { ...eventForm, id: e.id } : e));
    } else {
      const newEvent = { ...eventForm, id: Date.now() };
      setEvents([...events, newEvent]);
      
      if (eventForm.type === 'death') {
        setRabbits(rabbits.map(r => 
          r.id === parseInt(eventForm.rabbitId) ? { ...r, status: 'deceased' } : r
        ));
      }
      
      if (eventForm.type === 'sale' && eventForm.price) {
        setTransactions([...transactions, {
          id: Date.now() + 1,
          type: 'income',
          category: 'Rabbit Sale',
          amount: eventForm.price,
          date: eventForm.date,
          description: `Sale of rabbit`
        }]);
      }
    }
    closeModal();
  };

  const saveFair = () => {
    if (editingItem) {
      setFairs(fairs.map(f => f.id === editingItem.id ? { ...fairForm, id: f.id } : f));
    } else {
      setFairs([...fairs, { ...fairForm, id: Date.now() }]);
    }
    closeModal();
  };

  const saveTransaction = () => {
    if (editingItem) {
      setTransactions(transactions.map(t => t.id === editingItem.id ? { ...transactionForm, id: t.id } : t));
    } else {
      setTransactions([...transactions, { ...transactionForm, id: Date.now() }]);
    }
    closeModal();
  };

  const deleteItem = (type, id) => {
    if (!window.confirm('Are you sure?')) return;
    
    if (type === 'rabbit') setRabbits(rabbits.filter(r => r.id !== id));
    else if (type === 'breeding') setBreedings(breedings.filter(b => b.id !== id));
    else if (type === 'litter') setLitters(litters.filter(l => l.id !== id));
    else if (type === 'event') setEvents(events.filter(e => e.id !== id));
    else if (type === 'fair') setFairs(fairs.filter(f => f.id !== id));
    else if (type === 'transaction') setTransactions(transactions.filter(t => t.id !== id));
  };

  const getRabbitName = (id) => {
    const rabbit = rabbits.find(r => r.id === parseInt(id));
    return rabbit ? rabbit.name : 'Unknown';
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return 'N/A';
    const birth = new Date(birthDate);
    const today = new Date();
    const months = (today.getFullYear() - birth.getFullYear()) * 12 + today.getMonth() - birth.getMonth();
    if (months < 12) return `${months}mo`;
    return `${Math.floor(months / 12)}yr ${months % 12}mo`;
  };

  const stats = useMemo(() => {
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
    const netProfit = totalIncome - totalExpenses;
    
    const activeRabbits = rabbits.filter(r => r.status === 'active').length;
    const totalLitters = litters.length;
    const totalKits = litters.reduce((sum, l) => sum + parseInt(l.kitsAlive || 0), 0);
    const sales = events.filter(e => e.type === 'sale').length;
    
    return { totalIncome, totalExpenses, netProfit, activeRabbits, totalLitters, totalKits, sales };
  }, [transactions, rabbits, litters, events]);

  const headerStyle = {
    background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
    color: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '2rem 0'
  };

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1.5rem'
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    margin: '2rem 0'
  };

  const statCardStyle = {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  };

  const tabsStyle = {
    display: 'flex',
    gap: '0.25rem',
    background: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    padding: '0.5rem',
    overflowX: 'auto',
    marginBottom: '2rem'
  };

  const tabStyle = (active) => ({
    padding: '0.75rem 1.5rem',
    border: 'none',
    background: active ? '#16a34a' : 'transparent',
    borderRadius: '0.5rem',
    fontWeight: '500',
    color: active ? 'white' : '#6b7280',
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  });

  const contentCardStyle = {
    background: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem',
    padding: '2rem'
  };

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '0.5rem',
    fontWeight: '500',
    cursor: 'pointer',
    background: '#16a34a',
    color: 'white'
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    zIndex: 1000
  };

  const modalStyle = {
    background: 'white',
    borderRadius: '0.75rem',
    maxWidth: '42rem',
    width: '100%',
    padding: '2rem',
    maxHeight: '90vh',
    overflowY: 'auto'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    marginBottom: '1rem'
  };

  return (
    <div style={{minHeight: '100vh', background: '#f9fafb'}}>
      <header style={headerStyle}>
        <div style={containerStyle}>
          <h1 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>Rabbit Breeding Manager</h1>
          <p style={{color: 'rgba(255, 255, 255, 0.9)'}}>Track your homestead rabbits and operations</p>
        </div>
      </header>

      <div style={containerStyle}>
        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <div style={{fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem'}}>Active Rabbits</div>
            <div style={{fontSize: '1.875rem', fontWeight: 'bold', color: '#16a34a'}}>{stats.activeRabbits}</div>
          </div>
          <div style={statCardStyle}>
            <div style={{fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem'}}>Total Kits Born</div>
            <div style={{fontSize: '1.875rem', fontWeight: 'bold', color: '#2563eb'}}>{stats.totalKits}</div>
          </div>
          <div style={statCardStyle}>
            <div style={{fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem'}}>Total Sales</div>
            <div style={{fontSize: '1.875rem', fontWeight: 'bold', color: '#9333ea'}}>{stats.sales}</div>
          </div>
          <div style={statCardStyle}>
            <div style={{fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem'}}>Net Profit</div>
            <div style={{fontSize: '1.875rem', fontWeight: 'bold', color: stats.netProfit >= 0 ? '#16a34a' : '#dc2626'}}>
              ${stats.netProfit.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div style={containerStyle}>
        <div style={tabsStyle}>
          {['rabbits', 'breeding', 'litters', 'events', 'fairs', 'finances'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={tabStyle(activeTab === tab)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div style={containerStyle}>
        <div style={contentCardStyle}>
          {activeTab === 'rabbits' && (
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
                <h2 style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Rabbit Herd</h2>
                <button onClick={() => openModal('rabbit')} style={buttonStyle}>
                  <Plus size={20} /> Add Rabbit
                </button>
              </div>
              
              {rabbits.length === 0 ? (
                <div style={{textAlign: 'center', padding: '3rem', color: '#9ca3af'}}>
                  No rabbits added yet. Click Add Rabbit to get started.
                </div>
              ) : (
                <div>
                  {rabbits.map(rabbit => (
                    <div key={rabbit.id} style={{padding: '1rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between'}}>
                      <div>
                        <div style={{fontWeight: 'bold', fontSize: '1.1rem'}}>{rabbit.name}</div>
                        <div style={{fontSize: '0.9rem', color: '#6b7280'}}>
                          {rabbit.breed} • {rabbit.gender} • {calculateAge(rabbit.birthDate)}
                        </div>
                      </div>
                      <div style={{display: 'flex', gap: '0.5rem'}}>
                        <button onClick={() => openModal('rabbit', rabbit)} style={{...buttonStyle, padding: '0.5rem', background: '#2563eb'}}>
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => deleteItem('rabbit', rabbit.id)} style={{...buttonStyle, padding: '0.5rem', background: '#dc2626'}}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'breeding' && (
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
                <h2 style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Breeding Schedule</h2>
                <button onClick={() => openModal('breeding')} style={buttonStyle}>
                  <Plus size={20} /> Schedule Breeding
                </button>
              </div>
              {breedings.length === 0 ? (
                <div style={{textAlign: 'center', padding: '3rem', color: '#9ca3af'}}>
                  No breedings scheduled.
                </div>
              ) : (
                <div>
                  {breedings.map(breeding => (
                    <div key={breeding.id} style={{padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', marginBottom: '1rem'}}>
                      <div style={{fontWeight: 'bold'}}>{getRabbitName(breeding.damId)} × {getRabbitName(breeding.sireId)}</div>
                      <div style={{fontSize: '0.875rem', color: '#6b7280'}}>Bred: {breeding.breedDate}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'litters' && (
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
                <h2 style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Litter Records</h2>
                <button onClick={() => openModal('litter')} style={buttonStyle}>
                  <Plus size={20} /> Record Litter
                </button>
              </div>
              {litters.length === 0 && <div style={{textAlign: 'center', padding: '3rem', color: '#9ca3af'}}>No litters recorded.</div>}
            </div>
          )}

          {activeTab === 'events' && (
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
                <h2 style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Events</h2>
                <button onClick={() => openModal('event')} style={buttonStyle}>
                  <Plus size={20} /> Add Event
                </button>
              </div>
              {events.length === 0 && <div style={{textAlign: 'center', padding: '3rem', color: '#9ca3af'}}>No events recorded.</div>}
            </div>
          )}

          {activeTab === 'fairs' && (
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
                <h2 style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Local Fairs</h2>
                <button onClick={() => openModal('fair')} style={buttonStyle}>
                  <Plus size={20} /> Add Fair
                </button>
              </div>
              {fairs.length === 0 && <div style={{textAlign: 'center', padding: '3rem', color: '#9ca3af'}}>No fairs added.</div>}
            </div>
          )}

          {activeTab === 'finances' && (
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
                <h2 style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Financial Records</h2>
                <button onClick={() => openModal('transaction')} style={buttonStyle}>
                  <Plus size={20} /> Add Transaction
                </button>
              </div>
              {transactions.length === 0 && <div style={{textAlign: 'center', padding: '3rem', color: '#9ca3af'}}>No transactions recorded.</div>}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div style={modalOverlayStyle} onClick={closeModal}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <h3 style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem'}}>
              {editingItem ? 'Edit' : 'Add'} {modalType.charAt(0).toUpperCase() + modalType.slice(1)}
            </h3>
            
            {modalType === 'rabbit' && (
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={rabbitForm.name}
                  onChange={(e) => setRabbitForm({...rabbitForm, name: e.target.value})}
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Breed"
                  value={rabbitForm.breed}
                  onChange={(e) => setRabbitForm({...rabbitForm, breed: e.target.value})}
                  style={inputStyle}
                />
                <select
                  value={rabbitForm.gender}
                  onChange={(e) => setRabbitForm({...rabbitForm, gender: e.target.value})}
                  style={inputStyle}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <input
                  type="date"
                  value={rabbitForm.birthDate}
                  onChange={(e) => setRabbitForm({...rabbitForm, birthDate: e.target.value})}
                  style={inputStyle}
                />
                <textarea
                  placeholder="Notes"
                  value={rabbitForm.notes}
                  onChange={(e) => setRabbitForm({...rabbitForm, notes: e.target.value})}
                  style={inputStyle}
                  rows="3"
                />
              </div>
            )}

            {modalType === 'breeding' && (
              <div>
                <select value={breedingForm.damId} onChange={(e) => setBreedingForm({...breedingForm, damId: e.target.value})} style={inputStyle}>
                  <option value="">Select Dam (Mother)</option>
                  {rabbits.filter(r => r.gender === 'female').map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
                <select value={breedingForm.sireId} onChange={(e) => setBreedingForm({...breedingForm, sireId: e.target.value})} style={inputStyle}>
                  <option value="">Select Sire (Father)</option>
                  {rabbits.filter(r => r.gender === 'male').map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
                <input type="date" value={breedingForm.breedDate} onChange={(e) => setBreedingForm({...breedingForm, breedDate: e.target.value})} style={inputStyle} />
                <input type="date" value={breedingForm.expectedKindling} onChange={(e) => setBreedingForm({...breedingForm, expectedKindling: e.target.value})} style={inputStyle} />
              </div>
            )}

            {modalType === 'litter' && (
              <div>
                <select value={litterForm.breedingId} onChange={(e) => setLitterForm({...litterForm, breedingId: e.target.value})} style={inputStyle}>
                  <option value="">Select Breeding</option>
                  {breedings.map(b => (
                    <option key={b.id} value={b.id}>{getRabbitName(b.damId)} × {getRabbitName(b.sireId)}</option>
                  ))}
                </select>
                <input type="date" value={litterForm.birthDate} onChange={(e) => setLitterForm({...litterForm, birthDate: e.target.value})} style={inputStyle} />
                <input type="number" placeholder="Kits Alive" value={litterForm.kitsAlive} onChange={(e) => setLitterForm({...litterForm, kitsAlive: e.target.value})} style={inputStyle} />
              </div>
            )}

            {modalType === 'event' && (
              <div>
                <select value={eventForm.type} onChange={(e) => setEventForm({...eventForm, type: e.target.value})} style={inputStyle}>
                  <option value="death">Death</option>
                  <option value="sale">Sale</option>
                </select>
                <select value={eventForm.rabbitId} onChange={(e) => setEventForm({...eventForm, rabbitId: e.target.value})} style={inputStyle}>
                  <option value="">Select Rabbit</option>
                  {rabbits.map(r => (<option key={r.id} value={r.id}>{r.name}</option>))}
                </select>
                <input type="date" value={eventForm.date} onChange={(e) => setEventForm({...eventForm, date: e.target.value})} style={inputStyle} />
              </div>
            )}

            {modalType === 'fair' && (
              <div>
                <input type="text" placeholder="Fair Name" value={fairForm.name} onChange={(e) => setFairForm({...fairForm, name: e.target.value})} style={inputStyle} />
                <input type="date" value={fairForm.date} onChange={(e) => setFairForm({...fairForm, date: e.target.value})} style={inputStyle} />
                <input type="text" placeholder="Location" value={fairForm.location} onChange={(e) => setFairForm({...fairForm, location: e.target.value})} style={inputStyle} />
              </div>
            )}

            {modalType === 'transaction' && (
              <div>
                <select value={transactionForm.type} onChange={(e) => setTransactionForm({...transactionForm, type: e.target.value})} style={inputStyle}>
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
                <input type="text" placeholder="Category" value={transactionForm.category} onChange={(e) => setTransactionForm({...transactionForm, category: e.target.value})} style={inputStyle} />
                <input type="number" placeholder="Amount" value={transactionForm.amount} onChange={(e) => setTransactionForm({...transactionForm, amount: e.target.value})} style={inputStyle} />
                <input type="date" value={transactionForm.date} onChange={(e) => setTransactionForm({...transactionForm, date: e.target.value})} style={inputStyle} />
              </div>
            )}

            <div style={{display: 'flex', gap: '0.75rem', marginTop: '1.5rem'}}>
              <button
                onClick={modalType === 'rabbit' ? saveRabbit : 
                        modalType === 'breeding' ? saveBreeding :
                        modalType === 'litter' ? saveLitter :
                        modalType === 'event' ? saveEvent :
                        modalType === 'fair' ? saveFair :
                        saveTransaction}
                style={buttonStyle}
              >
                Save
              </button>
              <button onClick={closeModal} style={{...buttonStyle, background: '#e5e7eb', color: '#374151'}}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RabbitBreedingApp;