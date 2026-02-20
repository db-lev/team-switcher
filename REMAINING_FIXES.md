# Remaining Fixes for 3x3 Grid

## Convoy - Status: ✅ COMPLETE
All 3 design options now have:
- Same header and subhead
- Accounts section showing Convoy Austin + Convoy Dallas (faded)
- User/Person description consistent
- The Use Case section with proper sidebar behavior explanation

## Leverage Companies - Status: ⚠️ NEEDS MAJOR FIXES

### Current Issues:
1. Missing proper parent org + subsidiaries structure
2. No "The Use Case" section in some variants
3. Needs to show Leverage Companies as parent with Brick City Capital and Leverage Companies as subsidiary accounts
4. JP and Ian should each belong to different subsidiary accounts
5. User descriptions need to be consistent across all 3 design options

### Required Structure for ALL 3 Design Options:

**Header:**
- Organization: Leverage Companies (Parent Org)
- Subhead: Multi-entity lender - parent org with subsidiary accounts
- Badge: Lender (blue)

**Accounts:**
- Brick City Capital (subsidiary account under Leverage Companies)
- Leverage Companies (subsidiary account under parent org)

**Users:**
- JP Helan - belongs to Brick City Capital
- Ian Rodriguez - belongs to Leverage Companies

### Design Option 1 - Profile Switcher:
- Both users always in Lender Mode (no switcher needed)
- Sidebar shows Network, Vaults with blue dots
- Tooltips: "Shows data from [their specific account] only"
- Each user sees ONLY their own subsidiary account's data

### Design Option 2 - Unified:
- Both users see standard lender features
- No role indicators (single role)
- Tooltips explain data is from their specific subsidiary account
- JP sees Brick City data, Ian sees Leverage Co data

### Design Option 3 - Person-Centric:
- Person entities for JP and Ian
- Each has Membership to their respective subsidiary account
- Same UX as Design Option 2
- Explains Person as central identity

## Sidebar Tooltips - Status: ⚠️ PARTIALLY COMPLETE

### BWE - ✅ Done for D1, needs D2/D3
### Convoy - ❌ Needs all tooltips
### Leverage - ❌ Needs all tooltips

### Required Tooltips by Design Option:

**Design Option 1 (Profile Switcher):**
- All tooltips say "Shows data from [specific account] only"
- Example for BWE Broker Mode: "Shows deals from BWE Brokerage account only"
- Example for BWE Lender Mode: "Shows network from BWE Lending account only"

**Design Option 2 (Unified):**
- Broker-only features: "Shows data from [account] only"
- Dual-account features: "Shows data from both [account1] and [account2] accounts"
- Example for BWE Network: "Shows network contacts from both BWE Brokerage and BWE Lending accounts"

**Design Option 3:**
- Same as Design Option 2 (UX identical)
