'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ShoppingCart, Shield, Clock, Award, CheckCircle, Info, AlertCircle, HelpCircle } from 'lucide-react';

// ──────────────────────────────────────────────
// DATA
// ──────────────────────────────────────────────
const APPLIANCES = [
  {
    id: 'ac',
    name: 'AC Service',
    desc: 'Installation, Uninstall, Gas refilling, General service',
    icon: '❄️',
    serviceTypes: [
      { id: 'ac-general', label: 'General Service (AC)', desc: 'Cleaning, filter check, performance check' },
      { id: 'ac-gas', label: 'AC Gas Refilling', desc: 'Gas top-up (as per requirement)' },
      { id: 'ac-install', label: 'AC Installation', desc: 'New AC installation' },
      { id: 'ac-uninstall', label: 'AC Uninstallation', desc: 'Safe uninstallation of AC' },
    ],
    subTypeLabel: 'Select AC Type',
    subTypes: ['Split AC', 'Window AC', 'Cassette AC', 'Other'],
    knownProblems: [
      'Not cooling / Less cooling',
      'Water leakage from indoor unit',
      'Unusual noise or vibration',
      'Foul smell coming from AC',
      'AC turning on and off frequently',
      'Unknown Problem (Technician will inspect)',
    ],
    extras: ['AC Deep Cleaning', 'Jet Pump Service', 'Outdoor Unit Cleaning', 'Anti Bacterial Treatment'],
  },
  {
    id: 'washing-machine',
    name: 'Washing Machine',
    desc: 'Repair, Drum cleaning, Installation',
    icon: '🫧',
    serviceTypes: [
      { id: 'wm-general', label: 'General Inspection', desc: 'Full diagnostic check' },
      { id: 'wm-drum', label: 'Deep Drum Cleaning', desc: 'Complete drum & tub wash' },
      { id: 'wm-install', label: 'Installation / Uninstallation', desc: 'Setup or removal service' },
      { id: 'wm-repair', label: 'Repair (Not draining/spinning)', desc: 'Motor, pump, belt issues' },
    ],
    subTypeLabel: 'Select Machine Type',
    subTypes: ['Semi-Automatic', 'Fully Automatic (Top Load)', 'Fully Automatic (Front Load)', 'Other'],
    knownProblems: [
      'Not spinning or draining',
      'Excessive shaking / loud noise',
      'Water leaking from bottom',
      'Power / Display error code',
      'Drum not rotating',
      'Unknown Problem (Technician will inspect)',
    ],
    extras: ['Deep Tub Cleaning', 'Filter Cleaning', 'Pipe Replacement'],
  },
  {
    id: 'refrigerator',
    name: 'Refrigerator',
    desc: 'Repair, Gas charging, Thermostat issues',
    icon: '🧊',
    serviceTypes: [
      { id: 'fridge-general', label: 'General Inspection', desc: 'Full fridge diagnostic' },
      { id: 'fridge-gas', label: 'Gas Charging', desc: 'Refrigerant refilling' },
      { id: 'fridge-thermostat', label: 'Thermostat Repair', desc: 'Temperature control fix' },
      { id: 'fridge-compressor', label: 'Compressor Check', desc: 'Cooling unit diagnosis' },
    ],
    subTypeLabel: 'Select Fridge Type',
    subTypes: ['Single Door', 'Double Door', 'Side by Side', 'Mini Fridge'],
    knownProblems: [
      'Not cooling at all',
      'Freezer working but fridge not cooling',
      'Water leakage inside or back',
      'Continuous compressor running / Overheating',
      'Excessive frost build-up',
      'Unknown Problem (Technician will inspect)',
    ],
    extras: ['Deep Cleaning', 'Gasket Replacement', 'Ice Maker Service'],
  },
  {
    id: 'ro-purifier',
    name: 'RO Water Purifier',
    desc: 'Service, Repair, Water leakage',
    icon: '💧',
    serviceTypes: [
      { id: 'ro-service', label: 'Annual Service', desc: 'Filter change, sanitization' },
      { id: 'ro-repair', label: 'Repair', desc: 'Leak fix, motor repair' },
      { id: 'ro-install', label: 'Installation', desc: 'New RO setup' },
    ],
    subTypeLabel: null,
    subTypes: [],
    knownProblems: [
      'Water taste / bad odor',
      'Water leaking from filters/body',
      'Low water flow / Slow filling',
      'Auto-shutoff not working (TDS high)',
      'Continuous beep / alarm sound',
      'Unknown Problem (Technician will inspect)',
    ],
    extras: ['Filter Replacement', 'UV Lamp Replacement', 'Membrane Change'],
  },
  {
    id: 'microwave',
    name: 'Microwave Oven',
    desc: 'Repair, Not heating, Turntable issues',
    icon: '📡',
    serviceTypes: [
      { id: 'mw-not-heating', label: 'Not Heating', desc: 'Magnetron & fuse check' },
      { id: 'mw-turntable', label: 'Turntable Issue', desc: 'Motor & plate repair' },
      { id: 'mw-general', label: 'General Service', desc: 'Deep clean & inspection' },
    ],
    subTypeLabel: 'Select Type',
    subTypes: ['Solo', 'Grill', 'Convection', 'Other'],
    knownProblems: [
      'Microwave runs but does not heat',
      'Turntable plate not rotating',
      'Sparking inside cavity',
      'Touch buttons / keypad not responding',
      'Door latch stuck / broken',
      'Unknown Problem (Technician will inspect)',
    ],
    extras: ['Deep Cleaning', 'Door Latch Fix'],
  },
  {
    id: 'geyser',
    name: 'Geyser / Water Heater',
    desc: 'Repair, Heating issues, Installation',
    icon: '🚿',
    serviceTypes: [
      { id: 'geyser-not-heat', label: 'Not Heating', desc: 'Element & thermostat check' },
      { id: 'geyser-leak', label: 'Leaking', desc: 'Pipe & valve repair' },
      { id: 'geyser-install', label: 'Installation', desc: 'New geyser fitting' },
    ],
    subTypeLabel: 'Select Type',
    subTypes: ['Storage', 'Instant', 'Solar', 'Other'],
    knownProblems: [
      'Water not getting hot',
      'Water overheating / steam coming out',
      'Water leaking from tank / inlet valve',
      'MCB tripping when switched on',
      'Low hot water pressure',
      'Unknown Problem (Technician will inspect)',
    ],
    extras: ['Thermostat Replacement', 'Element Replacement', 'Anode Rod Change'],
  },
  {
    id: 'chimney',
    name: 'Chimney',
    desc: 'Suction issues, Cleaning',
    icon: '🏭',
    serviceTypes: [
      { id: 'chimney-clean', label: 'Deep Cleaning', desc: 'Oil & grease removal' },
      { id: 'chimney-suction', label: 'Suction Problem', desc: 'Motor & filter check' },
      { id: 'chimney-install', label: 'Installation', desc: 'New chimney fitting' },
    ],
    subTypeLabel: null,
    subTypes: [],
    knownProblems: [
      'Low suction power / Smoke not clearing',
      'Loud vibration or motor noise',
      'Oil leaking / dripping',
      'Touch / Push buttons not working',
      'LED light not turning on',
      'Unknown Problem (Technician will inspect)',
    ],
    extras: ['Filter Replacement', 'Motor Repair', 'LED Fix'],
  },
  {
    id: 'air-cooler',
    name: 'Air Cooler',
    desc: 'Water pump, Motor, Cooling issues',
    icon: '🌀',
    serviceTypes: [
      { id: 'cooler-pump', label: 'Water Pump Issue', desc: 'Pump motor replacement' },
      { id: 'cooler-motor', label: 'Motor Repair', desc: 'Fan blade & motor fix' },
      { id: 'cooler-cool', label: 'Not Cooling', desc: 'Pad & water level check' },
    ],
    subTypeLabel: 'Select Type',
    subTypes: ['Desert Cooler', 'Tower Cooler', 'Window Cooler', 'Other'],
    knownProblems: [
      'Fan not spinning / Slow speed',
      'Water pump not lifting water',
      'Bad smell from cooling pads',
      'Water leakage from tank',
      'Unusual humming or vibrating sound',
      'Unknown Problem (Technician will inspect)',
    ],
    extras: ['Cooling Pad Replacement', 'Water Tank Cleaning'],
  },
];

const TRUST_BADGES = [
  { icon: <Award className="h-7 w-7 text-primary" />, label: 'Experienced Technicians' },
  { icon: <Shield className="h-7 w-7 text-primary" />, label: 'Genuine Parts Used' },
  { icon: <Clock className="h-7 w-7 text-primary" />, label: 'On-Time Service' },
  { icon: <CheckCircle className="h-7 w-7 text-primary" />, label: 'Warranty on Service' },
];

const HOW_IT_WORKS = [
  { step: 1, label: 'Select Appliance' },
  { step: 2, label: 'Choose Service' },
  { step: 3, label: 'Technician Visit' },
  { step: 4, label: 'Inspection & Cost Estimate' },
  { step: 5, label: 'Service Completed' },
];

// ──────────────────────────────────────────────
// PAGE
// ──────────────────────────────────────────────
export default function ApplianceRepairPage() {
  const { addToCart } = useCart();

  const [selectedAppliance, setSelectedAppliance] = useState(APPLIANCES[0]);
  const [selectedServiceType, setSelectedServiceType] = useState(APPLIANCES[0].serviceTypes[0]);
  const [selectedSubType, setSelectedSubType] = useState(APPLIANCES[0].subTypes[0] ?? '');
  const [selectedProblem, setSelectedProblem] = useState(APPLIANCES[0].knownProblems[0]);
  const [customProblem, setCustomProblem] = useState('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const handleApplianceSelect = (appliance: typeof APPLIANCES[0]) => {
    setSelectedAppliance(appliance);
    setSelectedServiceType(appliance.serviceTypes[0]);
    setSelectedSubType(appliance.subTypes[0] ?? '');
    setSelectedProblem(appliance.knownProblems[0]);
    setCustomProblem('');
    setSelectedExtras([]);
  };

  const toggleExtra = (extra: string) => {
    setSelectedExtras(prev =>
      prev.includes(extra) ? prev.filter(e => e !== extra) : [...prev, extra]
    );
  };

  const handleAddToCart = () => {
    const problemText = selectedProblem.startsWith('Unknown') 
      ? (customProblem.trim() ? `Unknown Problem (${customProblem.trim()})` : 'Unknown Problem (Inspection needed)')
      : selectedProblem;

    const variantDetails = [
      selectedServiceType.label,
      selectedSubType ? `Type: ${selectedSubType}` : null,
      `Issue: ${problemText}`,
      selectedExtras.length ? `Extras: ${selectedExtras.join(', ')}` : null,
    ].filter(Boolean).join(' | ');

    const mockService = {
      id: `appliance-${selectedAppliance.id}`,
      name: `${selectedAppliance.name} – ${selectedServiceType.label}`,
      description: `${selectedServiceType.desc}. Issue: ${problemText}`,
      category: 'appliance' as const,
      image: { id: 'appliance', description: selectedAppliance.name, imageUrl: 'https://images.unsplash.com/photo-1585421514481-f3a2282270cb?w=400', imageHint: 'appliance repair' },
      gallery: [],
      features: [],
      variants: [{ id: `${selectedAppliance.id}-${selectedServiceType.id}-${Date.now()}`, name: variantDetails, price: 0 }],
    };
    addToCart(mockService as any, { id: `${selectedAppliance.id}-${selectedServiceType.id}-${Date.now()}`, name: variantDetails, price: 0 });
  };

  return (
    <div className="container mx-auto px-4 py-10 md:py-14">
      {/* Page heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">
          Book Home Appliance
          <span className="text-primary block md:inline md:ml-3">Repair &amp; Service</span>
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          Expert repair and service for all major home appliances at your doorstep. AC, Washing Machine, Fridge &amp; more.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ── LEFT PANEL ── */}
        <div className="space-y-6">
          {/* Appliance grid */}
          <div>
            <h2 className="text-xl font-semibold mb-4">1. Select Appliance</h2>
            <div className="grid grid-cols-3 gap-3">
              {APPLIANCES.map(app => (
                <button
                  key={app.id}
                  onClick={() => handleApplianceSelect(app)}
                  className={`rounded-xl border-2 p-3 text-center transition-all cursor-pointer hover:border-primary hover:bg-primary/5 ${
                    selectedAppliance.id === app.id
                      ? 'border-primary bg-primary/10 shadow-md'
                      : 'border-border bg-card'
                  }`}
                >
                  <div className="text-3xl mb-1">{app.icon}</div>
                  <p className="text-xs font-semibold leading-tight">{app.name}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight mt-1">{app.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Note box */}
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
            <Shield className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold">Note:</span> All repair &amp; service charges are onsite.
              Final cost depends on the issue and spare parts (if required).
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-4 gap-3">
            {TRUST_BADGES.map(b => (
              <div key={b.label} className="flex flex-col items-center gap-1 text-center p-2 rounded-lg bg-muted/50">
                {b.icon}
                <span className="text-[10px] font-medium text-muted-foreground leading-tight">{b.label}</span>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div>
            <h3 className="text-base font-semibold mb-3">How it works</h3>
            <div className="flex items-start gap-1 flex-wrap">
              {HOW_IT_WORKS.map((step, i) => (
                <div key={step.step} className="flex items-center gap-1">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {step.step}
                    </div>
                    <span className="text-[9px] text-muted-foreground text-center mt-1 w-14 leading-tight">
                      {step.label}
                    </span>
                  </div>
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="w-4 h-px bg-border mb-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="space-y-6">
          {/* Service Type */}
          <div>
            <h2 className="text-xl font-semibold mb-3">2. Select Service Type</h2>
            <div className="space-y-2">
              {selectedAppliance.serviceTypes.map(st => (
                <label
                  key={st.id}
                  className={`flex items-start gap-3 rounded-xl border-2 p-4 cursor-pointer transition-all ${
                    selectedServiceType.id === st.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="serviceType"
                    className="mt-1 accent-primary"
                    checked={selectedServiceType.id === st.id}
                    onChange={() => setSelectedServiceType(st)}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{st.label}</p>
                    <p className="text-xs text-muted-foreground">{st.desc}</p>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">(Onsite)</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sub Type */}
          {selectedAppliance.subTypeLabel && selectedAppliance.subTypes.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">3. {selectedAppliance.subTypeLabel}</h2>
              <div className="flex flex-wrap gap-2">
                {selectedAppliance.subTypes.map(st => (
                  <button
                    key={st}
                    onClick={() => setSelectedSubType(st)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                      selectedSubType === st
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border hover:border-primary text-foreground'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Known / Unknown Problem Selection */}
          <div>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <span>{selectedAppliance.subTypeLabel ? '4.' : '3.'} What is the problem?</span>
            </h2>
            <div className="space-y-2">
              {selectedAppliance.knownProblems.map(problem => {
                const isUnknown = problem.startsWith('Unknown');
                const isSelected = selectedProblem === problem;
                return (
                  <label
                    key={problem}
                    className={`flex items-start gap-3 rounded-xl border-2 p-3 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : isUnknown
                        ? 'border-dashed border-amber-400 bg-amber-50/50 hover:bg-amber-50'
                        : 'border-border hover:border-primary/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="knownProblem"
                      className="mt-1 accent-primary"
                      checked={isSelected}
                      onChange={() => setSelectedProblem(problem)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        {isUnknown ? (
                          <HelpCircle className="h-4 w-4 text-amber-600 shrink-0" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-primary shrink-0" />
                        )}
                        <span className={`text-sm font-medium ${isUnknown ? 'text-amber-900 font-semibold' : ''}`}>
                          {problem}
                        </span>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>

            {selectedProblem.startsWith('Unknown') && (
              <div className="mt-3">
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Describe what you are facing (Optional):
                </label>
                <textarea
                  value={customProblem}
                  onChange={e => setCustomProblem(e.target.value)}
                  placeholder="e.g. Making strange clicking sound, suddenly stopped working yesterday..."
                  rows={2}
                  className="w-full text-sm rounded-lg border border-border p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            )}
          </div>

          {/* Extra Services */}
          {selectedAppliance.extras.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">
                {selectedAppliance.subTypeLabel ? '5.' : '4.'} Add Extra Services
                <span className="ml-2 text-sm font-normal text-muted-foreground">(Optional)</span>
              </h2>
              <div className="space-y-2">
                {selectedAppliance.extras.map(extra => (
                  <label
                    key={extra}
                    className="flex items-center justify-between rounded-lg border p-3 cursor-pointer hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={extra}
                        checked={selectedExtras.includes(extra)}
                        onCheckedChange={() => toggleExtra(extra)}
                      />
                      <span className="text-sm font-medium">{extra}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">+ Doorstep</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Pricing note */}
          <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-900">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">Price decided at doorstep.</p>
              <p className="text-xs mt-0.5 text-blue-700">
                Final cost will be informed after inspection based on the issue and parts (if required).
              </p>
            </div>
          </div>

          {/* Summary & CTA */}
          <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-5 space-y-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Selected Service</p>
              <p className="font-bold text-base">{selectedAppliance.name} — {selectedServiceType.label}</p>
              {selectedSubType && <p className="text-xs text-muted-foreground">Type: {selectedSubType}</p>}
              <p className="text-xs text-primary font-medium mt-1">Issue: {selectedProblem.startsWith('Unknown') ? (customProblem.trim() || 'Unknown Problem (Technician Inspection)') : selectedProblem}</p>
              {selectedExtras.length > 0 && (
                <p className="text-xs text-muted-foreground mt-1">+ {selectedExtras.join(', ')}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">Price at Doorstep</p>
                <p className="text-xs text-muted-foreground">(Onsite evaluation by technician)</p>
              </div>
            </div>
            <Button onClick={handleAddToCart} size="lg" className="w-full">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
