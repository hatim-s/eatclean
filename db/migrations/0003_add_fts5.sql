-- FTS5 Virtual Table for Food Name Search
-- This replaces expensive vector_distance_cos scans with O(log n) FTS lookups

CREATE VIRTUAL TABLE foods_fts USING fts5(
  name,
  content='foods',
  content_rowid='id'
);

-- Populate FTS index from existing foods
INSERT INTO foods_fts(rowid, name) SELECT id, name FROM foods;

-- Triggers to keep FTS in sync when foods table changes
CREATE TRIGGER foods_ai AFTER INSERT ON foods BEGIN
  INSERT INTO foods_fts(rowid, name) VALUES (new.id, new.name);
END;

CREATE TRIGGER foods_ad AFTER DELETE ON foods BEGIN
  INSERT INTO foods_fts(foods_fts, rowid, name) VALUES('delete', old.id, old.name);
END;

CREATE TRIGGER foods_au AFTER UPDATE ON foods BEGIN
  INSERT INTO foods_fts(foods_fts, rowid, name) VALUES('delete', old.id, old.name);
  INSERT INTO foods_fts(rowid, name) VALUES (new.id, new.name);
END;
